"use client";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  videoID: string;
}

export default function ReactVideo({ videoID, ...props }: Readonly<Props>) {
  const src = `https://www.youtube-nocookie.com/embed/${videoID}`;

  return (
    <div className="relative w-full overflow-hidden pt-[56.25%]" {...props}>
      <iframe
        loading="lazy"
        title="Weather forecasts, nowcasts and history"
        className="absolute bottom-0 left-0 right-0 top-0 aspect-video h-full w-full"
        src={src}
        allowFullScreen
      />
    </div>
  );
}
