"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";




export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // sync session → state
  useEffect(() => {
    if (session?.user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  if (!session?.user) {
    return (
      <div className="h-screen flex items-center justify-center">
        Not logged in
      </div>
    );
  }

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          image,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      // update session instantly
      await update({
        ...session,
        user: {
          ...session.user,
          name,
          image,
        },
      });

      setIsEditing(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">

        {/* Avatar */}
        <div className="flex justify-center">
          <Image
            src={image || session.user.image}
            alt="User avatar"
            width={112}
            height={112}
            className="rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        {/* Info */}
        <div className="text-center mt-5">
          {isEditing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-3 py-2 rounded w-full text-center"
            />
          ) : (
            <h2 className="text-xl font-bold">{session.user.name}</h2>
          )}

          <p className="text-gray-500 text-sm mt-1">
            {session.user.email}
          </p>

          {/* image input */}
          {isEditing && (
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              className="border px-3 py-2 rounded w-full mt-3 text-center"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3 justify-center">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}