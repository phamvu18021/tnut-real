// "use client";

// import { Heading } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { Loading } from "./Loading";

// const commonForm = ({
//   uuid,
//   url,
//   size
// }: {
//   uuid: string;
//   url: string;
//   size?: { width?: string; height?: string };
// }) => {
//   if (!url) {
//     console.error("Invalid URL. Skipping iframe creation.");
//     return;
//   }

//   const getOdooUTM = () => {
//     let r =
//       window.document.referrer !== ""
//         ? window.document.referrer
//         : window.location.origin;
//     let regex = /(https?:\/\/.*?)\//g;
//     let furl = regex.exec(r);
//     r = furl ? furl[0] : r;
//     const url_string = new URLSearchParams(window.location.search);
//     let utm_params = "";
//     const utm_keys = [
//       "utm_source",
//       "utm_campaign",
//       "utm_medium",
//       "utm_content",
//       "utm_term"
//     ];
//     utm_keys.forEach((key) => {
//       if (
//         (!url_string.has(key) || url_string.get(key) === "") &&
//         document.cookie.match(new RegExp(key + "=([^;]+)")) !== null
//       ) {
//         const match = document.cookie.match(new RegExp(key + "=([^;]+)"));
//         utm_params += match ? "&" + match[0] : "";
//       } else {
//         const value = url_string.get(key);
//         utm_params += value !== null ? "&" + key + "=" + value : "";
//       }
//     });
//     utm_params += "&full_url=" + encodeURIComponent(window.location.href);
//     return utm_params;
//   };

//   const odooUTM = getOdooUTM();

//   const f = document.createElement("iframe");
//   const classForm = document.getElementsByClassName(
//     "formio_form_iframe_container"
//   );
//   let i = 0;
//   f.setAttribute("src", `${url}?referrer=${document.referrer}${odooUTM}`);
//   f.style.width = size?.width || "100%";
//   f.style.minHeight = size?.height || "450px";
//   f.classList.add("formio_form_embed");

//   for (; i < classForm.length; i++) {
//     const newId = `formio_form_iframe_container_${uuid}_${i}`;
//     classForm[i].id = newId;
//     const container = document.getElementById(newId);
//     if (container && !container.querySelector("iframe")) {
//       container.appendChild(f);
//     }
//   }
// };

// export const FormMain = ({
//   title,
//   color
// }: {
//   title?: string;
//   color?: string;
// }) => {
//   const [embed, setEmbed] = useState({
//     uuid: "",
//     url: "",
//     divClass: "",
//     divId: ""
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [isActivated, setIsActivated] = useState(false); // Đánh dấu khi script đã tải

//   useEffect(() => {
//     const getForm = async () => {
//       try {
//         const res = await fetch(`/api/data-form/?type=form-main`);
//         const data = await res.json();
//         setEmbed({
//           uuid: data?.uuid || "",
//           url: data?.url || "",
//           divClass: data?.divClass || "",
//           divId: data?.divId || ""
//         });
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching form data:", error);
//       }
//     };
//     getForm();
//   }, []);

//   useEffect(() => {
//     // Khởi tạo iframe giao diện
//     if (!isLoading && embed.url) {
//       commonForm({ uuid: embed.uuid, url: embed.url });
//     }
//   }, [embed, isLoading]);

//   const handleActivateScripts = () => {
//     if (isActivated) return;

//     const loadScript = (src: string) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.async = true;
//       document.body.appendChild(script);
//     };

//     // Tải các script cần thiết cho logic
//     loadScript("https://2p.sambala.net/formio/static/src/js/get_utm_url.js");
//     loadScript(
//       "https://2p.sambala.net/formio/static/lib/iframe-resizer/iframeResizer.min.js"
//     );
//     loadScript("https://2p.sambala.net/formio/static/src/js/set_cookie.js");

//     setIsActivated(true); // Đánh dấu script đã tải
//   };

//   return (
//     <>
//       {title && (
//         <Heading
//           as={"h2"}
//           size={{ base: "md", md: "lg" }}
//           textAlign={"center"}
//           color={color}
//           pt={"10px"}
//           pb={"16px"}
//         >
//           {title}
//         </Heading>
//       )}

//       {isLoading && <Loading he={"38vh"} />}
//       {!isLoading && (
//         <div
//           id={embed.divId}
//           title="form-main"
//           className={embed.divClass}
//           onClick={handleActivateScripts} // Kích hoạt logic khi click
//         />
//       )}
//     </>
//   );
// };

"use client";

import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";

const commonForm = ({
  uuid,
  url,
  size
}: {
  uuid: string;
  url: string;
  size?: { width?: string; height?: string };
}) => {
  if (!url) {
    console.error("Invalid URL. Skipping iframe creation.");
    return;
  }

  const odooUTM = (() => {
    let r =
      document.referrer !== "" ? document.referrer : window.location.origin;
    const url_string = new URLSearchParams(window.location.search);
    let utm_params = "";
    const utm_keys = [
      "utm_source",
      "utm_campaign",
      "utm_medium",
      "utm_content",
      "utm_term"
    ];
    utm_keys.forEach((key) => {
      const value = url_string.get(key);
      utm_params += value !== null ? `&${key}=${value}` : "";
    });
    utm_params += `&full_url=${encodeURIComponent(window.location.href)}`;
    return utm_params;
  })();

  const iframe = document.createElement("iframe");
  iframe.src = `${url}?referrer=${document.referrer}${odooUTM}`;
  iframe.style.width = size?.width || "100%";
  iframe.style.minHeight = size?.height || "450px";
  iframe.classList.add("formio_form_embed");

  const container = document.getElementById(
    `formio_form_iframe_container_${uuid}`
  );
  if (container && !container.querySelector("iframe")) {
    container.appendChild(iframe);
  }
};

export const FormMain = ({
  title,
  color
}: {
  title?: string;
  color?: string;
}) => {
  const [embed, setEmbed] = useState({
    uuid: "",
    url: "",
    divClass: "",
    divId: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await fetch(`/api/data-form/?type=form-main`);
        const data = await res.json();
        setEmbed({
          uuid: data?.uuid || "",
          url: data?.url || "",
          divClass: data?.divClass || "",
          divId: `formio_form_iframe_container_${data?.uuid || ""}`
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    getForm();
  }, []);

  useEffect(() => {
    // Giai đoạn 1: Khởi tạo giao diện iframe
    if (!isLoading && embed.url) {
      commonForm({ uuid: embed.uuid, url: embed.url });
    }
  }, [embed, isLoading]);

  const handleActivateScripts = () => {
    if (isScriptLoaded) return;

    // Tải script logic
    const loadScript = (src: string) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript("https://2p.sambala.net/formio/static/src/js/get_utm_url.js");
    loadScript(
      "https://2p.sambala.net/formio/static/lib/iframe-resizer/iframeResizer.min.js"
    );
    loadScript("https://2p.sambala.net/formio/static/src/js/set_cookie.js");

    setIsScriptLoaded(true);
  };

  return (
    <>
      {title && (
        <Heading
          as="h2"
          size={{ base: "md", md: "lg" }}
          textAlign="center"
          color={color}
          pt="10px"
          pb="16px"
        >
          {title}
        </Heading>
      )}

      {isLoading && <Loading he="38vh" />}
      {!isLoading && (
        <div
          id={embed.divId}
          title="form-main"
          className={embed.divClass}
          onClick={handleActivateScripts} // Chỉ tải logic khi người dùng click
        />
      )}
    </>
  );
};
