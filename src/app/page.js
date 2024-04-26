"use client"
import JoinForm from "@/layouts/components/JoinForm";
import CreateCode from "@/layouts/components/CreateCode";
import { useState } from "react";

export default function Home() {

  const [showForm , setShowForm] = useState(true);

  return (
    <>
      {/* The home page code */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="mockup-code">
            <pre data-prefix="$">
              <code>npm i daisyui</code>
            </pre>
            <pre data-prefix=">" className="text-warning">
              <code>installing...</code>
            </pre>
            <pre data-prefix=">" className="text-success">
              <code>Done!</code>
            </pre>
          </div>
          <div>
            <h1 className="text-5xl font-bold">Code<span className="text-5xl font-bold text-teal-500">Sync</span></h1>
            <h3 className="text-2xl font-bold pt-2">
            <span className="underline">Real-time</span> Collaborative Code Editor for Developers
            </h3>
            <p className="py-6">
              Empower your team&apos;ss coding experience with real-time
              collaboration. Seamlessly edit code together from anywhere,
              fostering creativity and efficiency
            </p>
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Modal code for taking the userId and the URL to connect */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          {showForm ? <JoinForm setShowForm={setShowForm}/> : <CreateCode setShowForm={setShowForm} />}
          <p className="py-4">Press <kbd className="kbd">ESC</kbd> key or click outside to close</p>
        </div>
          <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
