import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Saved() {
  const [savedLinks, setSavedLinks] = useState([]);
  const [lockShare, setLockShare] = useState(false);
  const fetchSavedLinks = async () => {
    const savedData = await chrome.storage.local.get("data");
    const savedLinks = savedData.data.savedpages || [];
    setSavedLinks(savedLinks);
  };

  useEffect(() => {
    fetchSavedLinks();
  }, []);

  async function shareLinks() {
    console.log(savedLinks);
    setLockShare(true);

    const saveCode = Array.from(Array(5), () =>
      Math.floor(Math.random() * 36).toString(36)
    ).join("");

    const res = await fetch("https://savelinksserver.dev-11.workers.dev/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: saveCode,
        value: JSON.stringify(savedLinks),
      }),
    });
    if (!res.ok) {
      await Swal.fire({
        title: "Error!",
        text: "Failed to share links",
        icon: "error",
        confirmButtonText: "Ok",
      });
      setLockShare(false);
      return;
    }
    await Swal.fire({
      title: "Links Shared!",
      html: `View here: <a href="https://sl.akshatsaraswat.in/${saveCode}" target="_blank">https://sl.akshatsaraswat.in/${saveCode}</a>`,
      icon: "success",
      confirmButtonText: "Cool",
    });
    setLockShare(false);
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4 gap-x-4">
        <h2 className="text-2xl mr-4font-bold">Saved Links</h2>
        <button
          disabled={lockShare}
          onClick={shareLinks}
          className="text-xl bg-zinc-300 text-zinc-800 p-1 rounded-md"
        >
          {lockShare ? "Sharing..." : "Share Links ⬆"}
        </button>
      </div>
      <ul>
        {savedLinks.map((link) => (
          <li key={link} className="bg-zinc-700 p-1 rounded-md mb-2 text-base">
            <a href={link} className="text-zinc-300 hover:text-zinc-100">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
