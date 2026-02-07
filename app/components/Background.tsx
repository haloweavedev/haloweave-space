"use client";

const images = [
  "/bg-images/bg-1.webp",
  "/bg-images/bg-2.webp",
  "/bg-images/bg-3.webp",
  "/bg-images/bg-4.webp",
  "/bg-images/bg-5.webp",
  "/bg-images/bg-6.webp",
];

export default function Background() {
  const doubled = [...images, ...images];

  return (
    <div className="bg-scroll-container">
      <div className="bg-scroll-track">
        {doubled.map((src, i) => (
          <img
            key={`bg-${i}`}
            src={src}
            alt=""
            className="bg-scroll-panel"
            draggable={false}
          />
        ))}
      </div>
      <div className="bg-scroll-overlay" />
    </div>
  );
}
