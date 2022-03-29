import React, { useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseClient";
import Head from "next/head";
import Image from "next/image";

const Blog = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  console.log(props.data);
  const [data, setData] = useState(props.data);
  // const [data,setData]=useState(data)
  return (
    <div>
      <Head>
        <title>Callouts Evolved | Blog</title>
        <meta
          name="description"
          content="A blog post focused on accessible communication within multiplayer video games."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.authorImg && (
        <Image
          src={data.authorImg}
          alt={data.authorAlt}
          height={100}
          width={100}
        />
      )}

      <p>{`authorAlt: ${data.authorAlt}`}</p>
      <p>{`authorBio: ${data.authorBio}`}</p>
      <p>{`authorLink: ${data.authorLink}`}</p>
      <p>{`authorName: ${data.authorName}`}</p>
      <p>{`blogAlt: ${data.blogAlt}`}</p>
      <p>{`blogData: `}</p>

      <ul>
        {data.blogData &&
          data.blogData.map((data, index) => (
            <div key={index}>
              <ul>
                <li>{`subAlt: ${data.subAlt}`}</li>
                <li>{`subContent: ${data.subContent}`}</li>
                <li>{`subImg: ${data.subImg}`}</li>
                <li>{`subTitle: ${data.subTitle}`}</li>
              </ul>
            </div>
          ))}
      </ul>

      <p>{`blogImg: ${data.blogImg}`}</p>
      <p>{`blogTitle: ${data.blogTitle}`}</p>

      <p>{`timestamp: ${data.timestamp} Minutes`}</p>
      <p>{`comments: ${data.comments?.length}`}</p>
      {data.comments &&
        data.comments.map((comment, index) => (
          <div key={index}>
            <ul>
              <li>{`comment : ${comment.comment}`}</li>
              <li>{`displayName : ${comment.displayName}`}</li>
              <li>{`profilePhotoURL : ${comment.profilePhotoURL}`}</li>
              <li>{`uid : ${comment.uid}`}</li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const param = slug[0];
  console.log(param);
  const ref = collection(firestore, "blog");
  try {
    const q = await query(
      ref,

      where("blogTitle", "==", param)
    );
    const res = await getDocs(q);

    const entry = res?.docs[0].data();
    return {
      props: { data: entry },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: { data: [{ title: "Error" }] },
    };
  }
};

export default Blog;
