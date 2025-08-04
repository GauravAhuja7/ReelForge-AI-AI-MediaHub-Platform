import Head from 'next/head';

export default function TavusVideo() {
  const videoUrl = 'https://tavus.video/bd1d645b11';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>View Tavus AI Video</title>
      </Head>

      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-center mb-8">Tavus AI Video</h1>
        <div className="relative w-full overflow-hidden aspect-video">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}