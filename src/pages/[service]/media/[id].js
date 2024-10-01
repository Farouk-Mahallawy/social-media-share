// "use client";

// import Head from "next/head";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// const NewMediaDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [mediaData, setMediaData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMediaData = async () => {
//       if (!id) return;
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `https://apis.twist-sports.com/api/media/${id}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "Accept-Language": "ar",
//             },
//           }
//         );
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await res.json();
//         setMediaData(data.data);
//       } catch (error) {
//         console.error("Failed to fetch media data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMediaData();
//   }, [id]);

//   return (
//     <div>
//       {mediaData && (
//         <Head>
//           <title>{mediaData?.title}</title>
//           <meta name="description" content={mediaData?.lead} />
//           <meta name="keywords" content="ليفربول, وست هام, كأس الرابطة" />
//           <meta property="og:title" content={mediaData?.title} />
//           <meta property="og:description" content={mediaData?.lead} />
//           <meta
//             property="og:image"
//             content={`https://backend.appkora.com${mediaData?.media}`}
//           />
//           <meta property="og:image:width" content="1200" />
//           <meta property="og:image:height" content="630" />
//           <meta property="og:url" content="https://www.twistsports.com/" />
//         </Head>
//       )}
//       <h1>Media Details</h1>
//       {mediaData ? (
//         <>
//           <div>ID: {mediaData?.id}</div>
//           <div> {mediaData?.lead}</div>
//           <img src={`https://backend.appkora.com${mediaData?.media}`} />
//         </>
//       ) : (
//         <p>No media data found.</p>
//       )}
//     </div>
//   );
// };

// export default NewMediaDetails;

"use client";

import Head from "next/head";
import { useRouter } from "next/router";

const NewMediaDetails = ({ mediaData }) => {
  const router = useRouter();

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

  return {
    props: {
      mediaData,
    },
  };
}

export default NewMediaDetails;
