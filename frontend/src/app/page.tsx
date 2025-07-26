"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [watchHours, setWatchHours] = useState(0);
  const [isVideoDeleted, setIsVideoDeleted] = useState(false);
  const [lastChecked, setLastChecked] = useState<null | Date>(null);
  const [targetHours, setTargetHours] = useState(4000);

  useEffect(() => {
    fetch("/analytics.json")
      .then((res) => res.json())
      .then((data) => {
        setWatchHours(data.watchHours);
        setIsVideoDeleted(data.isVideoDeleted);
        setLastChecked(new Date(data.lastChecked));
        setTargetHours(data.targetHours || 4000);
      });
  }, []);

  return (
    <main>
      <header className="header">
        <h1>💥 Self-Destructing YouTube Video</h1>
      </header>

      <section className="video">
        <div className="video__frame">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/n_9akba9up8?si=duj6STJf_1wC0mwG"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className="content">
        <p>
          The video will be deleted when I reach{" "}
          <strong>4,000 watch hours</strong> for my YouTube channel. Why 4,000?
          Because that is when I get monetized, haha. So, why not make the
          journey more fun xD?
        </p>
        <p>
          If you want to know how I did it, you can read more in{" "}
          <a
            href="https://github.com/technoph1le/youtube-self-destruct-video"
            target="_blank"
            rel="noopener noreferrer"
          >
            this GitHub repo
          </a>
          .
        </p>
        <ul className="cards">
          <li className="card">
            <p className="card__number">
              {Math.floor(watchHours).toLocaleString()}
            </p>
            <p>Current watch hours</p>
          </li>
          <li className="card">
            <p className="card__number">
              {Math.max(
                0,
                Math.floor(targetHours - watchHours)
              ).toLocaleString()}
            </p>
            <p>Watch hours left</p>
          </li>
          <li className="card">
            {/* turn date into readable format */}
            <p className="card__number">
              {lastChecked?.toISOString().split("T")[0]}
            </p>
            <p>Last checked</p>
          </li>
          <li className="card">
            <p className="card__number">{isVideoDeleted ? "True" : "False"}</p>
            <p>IsVideoDeleted?</p>
          </li>
        </ul>
      </section>
    </main>
  );
}
