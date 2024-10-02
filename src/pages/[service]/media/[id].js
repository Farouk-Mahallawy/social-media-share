"use client";

import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const NewMediaDetails = ({ mediaData, redirectUrl }) => {
  const router = useRouter();

  // Redirecting in useEffect if redirectUrl is provided
  useEffect(() => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  }, [redirectUrl, router]);

  if (!mediaData) {
    return <p>No media data found.</p>; // Handle the case where no data is available
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
  const { id } = context.query;
  let mediaData = null;
  let redirectUrl = null;
  const { req } = context;
  const pathname = req.url;

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

  if (true) {
    redirectUrl = `https://www.twistsports.com${pathname}`;
  }

  return {
    props: {
      mediaData,
      redirectUrl, // Pass the redirect URL to the component
    },
  };
}

export default NewMediaDetails;
