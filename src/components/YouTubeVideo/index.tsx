"use client";

type Props = {
  videoID: string;
};

export default function YouTubeVideo({ videoID }: Readonly<Props>) {
  const src = `https://www.youtube-nocookie.com/embed/${videoID}`;

  return (
    <div className="relative w-full overflow-hidden pt-[56.25%]">
      <iframe
        title="Weather forecasts, nowcasts and history"
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
        src={src}
        allowFullScreen
      />
    </div>
  );
}
