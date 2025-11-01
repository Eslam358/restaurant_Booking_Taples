"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "../../../hooks/supabase/supabase-client";
import { Session } from "@supabase/supabase-js";
import Image from "next/image";

interface Task {
  id: number;
  title: string;
  dec: string;
  created_at: string;
  imge_url?: string;
}

function TaskManager({ session }: { session: Session }) {

  const [newTask, setNewTask] = useState({ title: "", dec: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newDescription, setNewDescription] = useState("");

  const [taskImage, setTaskImage] = useState<File | null>(null);

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("task")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error reading task--000000000000: ", error.message);
      return;
    }

    setTasks(data);
  };

  const deleteTaskk = async (id: number, filePath?: string) => {
    filePath = filePath?.split("/").pop()
    if (!filePath) return;
    const rr = await supabase.storage
      .from("store-Eslam_img").remove([filePath])
      console.log("rrrrr----", rr);
      
      if (rr.error) {
        console.error("------------delete-------",rr.error)
        return
      }

      const A = await supabase.from("task").delete().eq("id", id);


    if (A.error) {
      console.error("Error deleting task: ", A.error.message);
    } else {

    }
    return;
  };
//***********  */
const deleteTask = async (id: number, filePath?: string) => {
  try {
    // 🧩 1. حذف السجل من جدول task
    const { error: deleteError } = await supabase
      .from("task")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("❌ Error deleting task:", deleteError.message);
      return;
    }

    // 🧩 2. حذف الصورة من التخزين (bucket)
    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from("store-Eslam_img") // ← تأكد أن اسم الـ bucket صحيح بالضبط
        .remove([filePath]);     // ← لازم يكون المسار صحيح داخل الـ bucket

      if (storageError) {
        console.error("❌ Error deleting image:", storageError.message);
        return;
      }

      console.log("✅ Task and image deleted successfully!");
    }
  } catch (err) {
    console.error("Unexpected error while deleting:", err);
  }
};

//***********  */
  const updateTask = async (id: number) => {
    const { error } = await supabase
      .from("task")
      .update({ dec: newDescription })
      .eq("id", id);

    if (error) {
      console.error("Error updating task: ", error.message);
      return;
    }
    setNewDescription("");
    fetchTasks();
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${Date.now()}-${file.name}`;
    console.log(filePath)

    const { error } = await supabase.storage
      .from("store-Eslam_img")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image------------1:", error.message);
      return null;
    }

    const { data } = await supabase.storage
      .from("store-Eslam_img")
      .getPublicUrl(filePath);
    console.log("data.publicUrl-------------2", data.publicUrl);

    return data.publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl: string | null = null;
    if (taskImage) {
      imageUrl = await uploadImage(taskImage);
    }

    const { error } = await supabase
      .from("task")
      .insert({ ...newTask, email: session.user.email, imge_url: imageUrl })
      .single();

    if (error) {
      console.error("Error adding task: ", error.message);
      return;
    }
    fetchTasks();

    setNewTask({ title: "", dec: "" });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
      console.log("------------------0", e.target.files[0]);

    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  //***************************** */
  useEffect(() => {
    // أنشئ القناة
    const channel = supabase.channel("task-channel");

    // سجل الاستماع مع logging كامل
    channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "task" },
      (payload) => {
        console.log("Realtime payload received:", payload);
        try {
          const newTask = payload.new as Task;
          // setTasks((prev) => [...prev, newTask]);
          fetchTasks();
        } catch (err) {
          console.error("Failed to handle payload:", err);
        }
      }
    );

    // اشترك صراحة ثم راقب الحالة
    channel.subscribe((status) => {
      console.log("Realtime subscribe status:", status);
    });

    // cleanup عند unmount
    return () => {
      try {
        // إزالة القناة بأمان
        supabase.removeChannel(channel);
        console.log("Realtime channel removed");
      } catch (err) {
        console.warn("Failed to remove channel:", err);
      }
    };
  }, []);

  //***************************** */

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      <h2>Task Manager CRUD</h2>

      {/* Form to add a new task */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          className="border rounded p-2"
          value={newTask.title}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Task Description"
          className="border rounded-md p-2"
          value={newTask.dec}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, dec: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />

        <input className="border rounded-md p-2 bg-cyan-600" type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" className="bg-blue-500 text-white rounded-md w-full p-2">

          Add Task
        </button>
      </form>

      {/* List of Tasks */}
      <ul style={{ listStyle: "none", padding: 0 }} className="mt-4 border border-green-500 ">
        {tasks.map((task, key) => (
          <li
            className=" border border-red-500 rounded-md p-2"
            key={key}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.dec}</p>
              <p className="text-green-500 font-bold">{session.user.user_metadata.name}</p>

              <img src={task.imge_url} style={{ height: 70 }} />
              <div>
                <textarea
                  placeholder="Updated description..."
                  className="border rounded-md p-2"
                  value={newDescription}

                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white rounded-md w-full p-2"
                  style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
                  onClick={() => updateTask(task.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white rounded-md w-full p-2"
                  style={{ padding: "0.5rem 1rem" }}
                  onClick={() => deleteTask(task.id, task.imge_url)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
