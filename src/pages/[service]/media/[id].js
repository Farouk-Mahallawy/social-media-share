"use client";

import Head from "next/head";

const NewMediaDetails = ({ mediaData }) => {
  if (!mediaData) {
    return <p>No media data found.</p>;
  }
  const isVideo = mediaData.video_cover;
  return (
    <div>
      <Head>
        <title>{mediaData.title}</title>
        <meta name="description" content={mediaData.lead} />
        <meta name="keywords" content="ليفربول, وست هام, كأس الرابطة" />
        <meta property="og:title" content={mediaData.title} />
        <meta property="og:description" content={mediaData.lead} />
        <meta
          property="og:url"
          content={`https://www.twistsports.com/${mediaData.service}/media/${mediaData.id}`}
        />
        {isVideo ? (
          <>
            <meta
              property="og:image"
              content={`https://backend.appkora.com${mediaData.media}`}
            />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        ) : (
          <>
            <meta property="og:type" content="video.other" />
            <meta
              property="og:video"
              content={`https://backend.appkora.com${mediaData.media}`}
            />
            <meta property="og:video:type" content="video/mp4" />
            <meta property="og:video:width" content="1280" />
            <meta property="og:video:height" content="720" />
          </>
        )}
      </Head>
      <h1>Media Details</h1>
      <div>ID: {mediaData.id}</div>
      <div>{mediaData.lead}</div>
      <img src={`https://backend.appkora.com${mediaData.media}`} alt="Media" />
      <video controls autoPlay muted width={1280} height={720}>
        <source src={`https://backend.appkora.com${mediaData.media}`}></source>
      </video>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id, service } = context.query;
  const userAgent = context.req.headers["user-agent"];
  let mediaData = null;

  // Define known social media bots
  const socialMediaBots = [
    /facebookexternalhit/i,
    /Facebot/i,
    /Twitterbot/i,
    /LinkedInBot/i,
    /Googlebot/i,
  ];

  // Check if the request is from a known bot
  const isSocialMediaBot = socialMediaBots.some((bot) => bot.test(userAgent));

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
        if (data && data.data) {
          mediaData = data.data;
        } else {
          console.error("Unexpected data format:", data);
        }
      } else {
        console.error("Fetch error:", res.status, await res.text());
      }
    } catch (error) {
      console.error("Failed to fetch media data:", error);
    }
  }

  if (!isSocialMediaBot) {
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
