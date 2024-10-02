"use client";

import Head from "next/head";
import { useParams } from "next/navigation";

const NewMediaDetails = ({ mediaData }) => {
  const pathname = useParams();

  if (!mediaData) {
    return <p>No media data found.</p>;
  }

  return (
    <div>
      <Head>
        <title>{mediaData.title}</title>
        <meta name="description" content={mediaData.lead} />
        <meta name="keywords" content="ليفربول, وست هام, كأس الرابطة" />
        <meta property="og:title" content={mediaData.title} />
        <meta property="og:description" content={mediaData.lead} />
        <meta
          property="og:image"
          content={`https://backend.appkora.com${mediaData.media}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://www.twistsports.com/" />
      </Head>
      <h1>Media Details</h1>
      <div>ID: {mediaData.id}</div>
      <div>{mediaData.lead}</div>
      <img src={`https://backend.appkora.com${mediaData.media}`} alt="Media" />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id, service } = context.query;
  let mediaData = null;

  const isBot = userAgent && /bot|crawl|slurp|spider/i.test(userAgent);

  if (id) {
    try {
      const res = await fetch(`https://apis.twist-sports.com/api/media/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "ar",
        },
      });
      if (res.ok) {
        const data = await res.json();
        mediaData = data.data;
      }
    } catch (error) {
      console.error("Failed to fetch media data:", error);
    }
  }
  if (!isBot) {
    return {
      redirect: {
        destination: `https://www.twistsports.com/${service}/media/${id}`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      mediaData,
    },
  };
}

export default NewMediaDetails;
