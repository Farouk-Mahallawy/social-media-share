"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NewMediaDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const serviece = "local";
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(
          `https://apis.twist-sports.com/api/media/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "ar",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setMediaData(data.data);
      } catch (error) {
        console.error("Failed to fetch media data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMediaData();
  }, [id]);

  return (
    <div>
      <Head>
        <title>{mediaData ? mediaData.title : "Loading..."}</title>
        <meta
          name="description"
          content={mediaData ? mediaData.lead : "Loading..."}
        />
        <meta name="keywords" content="ليفربول, وست هام, كأس الرابطة" />
        <meta
          property="og:title"
          content={mediaData ? mediaData.title : "Loading..."}
        />
        <meta
          property="og:description"
          content={mediaData ? mediaData.lead : "Loading..."}
        />
        <meta
          property="og:image"
          content={`https://backend.appkora.com${mediaData?.media}`}
        />
        <meta property="og:url" content="https://www.twistsports.com/" />
      </Head>
      <h1>Media Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : mediaData ? (
        <>
          <div>ID: {mediaData.id}</div>
          <div> {mediaData.lead}</div>
          <img src={`https://backend.appkora.com${mediaData?.media}`} />
        </>
      ) : (
        <p>No media data found.</p>
      )}
    </div>
  );
};

export default NewMediaDetails;
