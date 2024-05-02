"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Amplify } from "aws-amplify";
import amplifyconfig from "../../src/amplifyconfiguration.json";
import { uploadData, list } from "aws-amplify/storage";
import { remove } from "aws-amplify/storage";
import VerticalNav from "@/components/VerticalNav";
import down from "../../public/chevron-down.svg";
import upload from "../../public/upload-03.svg";
import trash from "../../public/trash-03.svg";
import eye from "../../public/eye-open.svg";
import x from "../../public/x-02.svg";
import { getUrl } from "aws-amplify/storage";
import { getProperties } from "aws-amplify/storage";
import { downloadData } from "aws-amplify/storage";
import Iframe from "react-iframe";
import { Transition } from "@headlessui/react";
import { Resizable, ResizableBox } from "react-resizable"
import { userInfo } from "os";

const Upload = () => {
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();
  const [ragData, setRagData] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [user, setUser] = useState();
  const [mode, setMode] = useState("policies");
  const [showUploadDropdown, setShowUploadDropdown] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [metaData, setMetaData] = useState([]);
  const [pdfContent, setPdfContent] = useState("");
  const [ragUpload, setRagUpload] = useState(false);
  const [isShowOpen, setIsShowOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showInPage, setShowInPage] = useState(false);
  const [uploadStatuses, setUploadStatuses] = useState({});


  const openModal = (content) => {
    setModalContent(content.url.toString());
    console.log(content)
    console.log("Here")
    console.log(modalContent)
    setShowInPage(true)
  };


  const closeModal = () => {
    setModalContent(null);
  };

  let start = 0;

  Amplify.configure(amplifyconfig);

  useEffect(() => {
    const fetchInitialData = async () => {
      const params = new URLSearchParams(window.location.search);
      setUser(params.get("user"));
      console.log(user)

      try {
        const params = new URLSearchParams(window.location.search);
        setUser(params.get("user"));
        const result = await list({
          prefix: `${params.get("user")}`,
          options: {
            listAll: true,
          },
        });
        setFiles(result.items);

        // Process the result here
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialData();

    // Call the async function
  }, []);

  useEffect(() => {
    console.log(files);
    const fetchInitialMeta = async () => {
      try {
        const resultPromises = files.map(async (file) => {
          const properties = await getProperties({
            key: file.key,
            options: {
              accessLevel: "guest", // defaults to `guest` but can be 'private' | 'protected' | 'guest'
            },
          });
          console.log(properties);
        });

        // Wait for all promises to resolve
        const results = await Promise.all(resultPromises);
        setMetaData(results);

        // Process the results here if needed
        console.log(results);
      } catch (error) {
        console.error("Error fetching file properties:", error);
      }
    };

    fetchInitialMeta();
  }, [files]);

  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = {};
      for (const file of files) {
        try {
          const response = await checkUploadStatus(file.key);
          if (!response.ok) {
            throw new Error(`Response wasn't okay`);
          }
          const responseBody = response.body
          statuses[file.key] = responseBody.response;
        } catch (error) {
          console.error(`Error fetching upload status for file ${file.key}:`, error);
          statuses[file.key] = "Error"; // Set error status for the file
        }
      }
      setUploadStatuses(statuses);
    };

    fetchStatuses();
  }, [files]);

  const rag_upload = async (key) => {
    console.log(key);
    console.log(mode);

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: "demo",
          s3_bucket: "cair-user-uploads163557-dev",
          s3_key: `${key}`,
          file_type: ".pdf",
          mode: `${mode}`,
        }),
      };
      const response_policies = await fetch(
        "https://chat.cairhealth.com/upload_document/",
        requestOptions,
      );

      console.log(response_policies);
      console.log(error);
    } catch (error) {
      console.log("RAG upload error:", error);
    }
  };

  const fileKeySetter = async (key) => {
    setFileKey(key);
  };

  const checkUploadStatus = async (filekey) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          s3_key: `public/${filekey}`,
        }),
      };
      const upload_status = await fetch(
        "https://chat.cairhealth.com/check_document_upload_status/",
        requestOptions,
      );

      console.log(upload_status);

    } catch (error) {
      console.log("Pinecone Status Check error:", error);
    }
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    Array.from(droppedFiles).forEach((file) => {
      handleFileLoad(file);
    });
  };

  const handleFileLoad = async (file) => {
    try {
      const key = `${user}_user_${mode}_main_${file.name}`;
      await fileKeySetter(key);
      const result = await uploadData({
        key: key,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              setProgress(
                `Upload progress ${Math.round(
                  ((transferredBytes - 10) / totalBytes) * 100,
                )} %`,
              );
            }
          },
          metadata: { type: mode, person: user },
          contentType: "application/pdf"
        },
        
      }).result;
      console.log("Succeeded: ", result);
      console.log(fileKey);
      console.log(mode);
      

      setFiles(prevFiles => [...prevFiles, { key: key, lastModified: new Date() }]);

      fetchInitialData();


    } catch (error) {
      console.log("Error : ", error);
    }
    rag_upload(`${user}_${mode}_main_${file.name}`);
  };

  const handleShow = async (file, filekey) => {
    console.log(filekey);
    try {
      const getUrlResult = await getUrl({
        key: filekey,
          options: {
            accessLevel: "guest", // can be 'private', 'protected', or 'guest' but defaults to `guest` // defaults to false
          },
      });
      console.log("FileKey");
      console.log(filekey)
      
      openModal(getUrlResult)
    }catch(error){
      console.log(error)
    }
  };

  const handleDelete = async (filename) => {
    try {
      await remove({ key: filename });
      window.location.reload();
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const handleUploadOpen = (m) => {
    setMode(m);
    setIsUploadOpen(true);
    setShowUploadDropdown(false);
  };

  return (
    <div className="">


<Transition
  show={showInPage}
  enter="transition-opacity duration-75"
  enterFrom="opacity-0"
  enterTo="opacity-100"
  leave="transition-opacity duration-150"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>

<Resizable direction = "vertical">
  <div
    className="border pt-2  h-[80%] w-1/3 overflow-auto border-gray-400 absolute right-0 opacity-97  flex flex-col items-start resize"
    style={{ background: "#F2F4F5", zIndex: 998, direction: "rtl" }}
  >
    <div className="pl-5 flex flex-row">
      <Image
        src={x}
        width="auto"
        height="auto"
        className="cursor-pointer hover:focus"
        onClick={() => setShowInPage(false)}
        style={{ zIndex: 999 }}
      />
    </div>

    <div className="flex justify-end px-4 pt-2"></div>
    <div className="p-2 w-full h-full">
      <iframe
        title="Modal Content"
        src= {modalContent}
        className=""
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  </div>
  </Resizable>
  
</Transition>

      <div className={`flex ${isUploadOpen ? "contrast-50" : ""}`}>
        <VerticalNav user = {user}/>
        <div className="h-screen w-full bg-white text-black">
          <div className="flex py-12 px-[9rem] ">
          <h1 className="text-3xl font-semibold text-teal-70">{user}&apos;s </h1>
            <h1 className="text-3xl font-semibold pl-2"> File Manager</h1>
            <div className="flex-grow"></div>
            <div className="flex-col">
              <div
                className=" flex text-medium font-semibold border-2 px-2 rounded-xl py-1 border-brand-primary-500 bg-brand-primary-600 text-white "
                onClick={() => {
                  setShowUploadDropdown(!showUploadDropdown);
                  console.log("showing");
                }}
              >
                <Image
                  src={upload}
                  height="auto"
                  width="auto"
                  className="mr-1"
                  style={{ filter: "brightness(0) invert(1)" }}
                  alt="upload"
                />
                <button className="">Upload Files</button>
                <Image
                  src={down}
                  height="auto"
                  width="auto"
                  className="ml-1"
                  style={{ filter: "brightness(0) invert(1)" }}
                  alt="delete"
                />
              </div>
              {showUploadDropdown ? (
                <div className="absolute flex-col  font-semibold shadow-2xl items-center  bg-white rounded-xl  text-black">
                  <ol className="w-full items-center justify-center text-center">
                    <div className="w-full px-[5rem] "></div>
                    <li
                      className="text-xl w-full cursor-pointer text-center hover:bg-gray-200 pt-5 pb-5"
                      onClick={() => {
                        handleUploadOpen("policies");
                      }}
                    >
                      Policies
                    </li>

                    <li
                      className="text-xl hover:bg-gray-200 cursor-pointer pt-5 pb-5"
                      onClick={() => {
                        handleUploadOpen("contracts");
                      }}
                    >
                      Contracts
                    </li>
                    <li
                      className="text-xl hover:bg-gray-200 cursor-pointer pt-5 pb-5"
                      onClick={() => {
                        handleUploadOpen("rates");
                      }}
                    >
                      Rates
                    </li>
                  </ol>
                </div>
              ) : (
                <div> </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* <input ref={ref} type="file" onChange={handleFileLoad} /> */}

            <table className="divide-y w-5/6 table-auto rounded-xl overflow-hidden divide-gray-200 ">
              <thead className="bg-gray-200  ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    File Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Uploaded By
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ready to Chat?
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file, i) => (
                  <tr key={file.key}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {file.lastModified.toDateString()}
                    </td>
                    <div className="items-center justify-center px- py-3 ">
                      <td
                        className={`px-8 text-center font-semibold rounded-lg whitespace-nowrap ${
                          file.key.split("_")[2] === "policies"
                            ? "bg-green-100"
                            : ""
                        } ${
                          file.key.split("_")[2] === "contracts"
                            ? "bg-red-100"
                            : ""
                        } ${
                          file.key.split("_")[2] === "rates"
                            ? "bg-yellow-100"
                            : ""
                        }`}
                      >
                        {file.key.split("_")[2]}
                      </td>
                    </div>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {file.key.split("_").slice(4).join("_")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="border-2 border-gray-200 rounded-xl bg-gray-100 p-2 mr-4"
                        onClick={() => handleDelete(file.key)}
                      >
                        <Image
                          src={trash}
                          height="auto"
                          width="auto"
                          alt="trash"
                        />
                      </button>
                      <button
                        className="border-2 border-gray-200 rounded-xl bg-gray-100 p-2"
                        onClick={() => {
                          handleShow(file, file.key);
                          console.log(file.key)
                        }}
                      >
                        <Image
                          src={eye}
                          height="auto"
                          width="auto"
                          alt="view"
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      {file.key.split("_")[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-900">
                        Restricted For Demo Access
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {isUploadOpen ? (
          <div className="text-xl flex flex-col z-50 px-[2rem] text-black rounded-2xl py-[3.5rem] bg-white"  onDragOver={(e) => {
            e.preventDefault()
          }}
          onDrop = {handleDrop}>

            <div className="w-full p-4 border-4 border-dashed rounded-xl h-full flex flex-col text-center items-center ">
              <div className="bg-background-light rounded-full items-center align-center justify-center px-4 py-4 ">
                <Image
                  src={upload}
                  height="60"
                  width="auto"
                  alt="upload"
                  className=" contrast-175"
                />
              </div>
              <h1 className="text-4xl font-semibold mt-20">
                Upload a single file or multiple files by uploading them here
              </h1>

              <div className="mt-20 flex bg-gray-50 px-4 py-4 border-2 border-gray-200 rounded-xl cursor-pointer">
                <Image
                  src={upload}
                  height="24"
                  width="auto"
                  alt="upload"
                  className="mr-2"
                />
                <label className="cursor-pointer">
                  Browse Files
                  <input
                    ref={ref}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileLoad(e.target.files[0])}
                  />
                  <h1>{progress !== 'Upload progress 100 %' ? progress : null}</h1>
                </label>
              </div>
            </div>

            <div className="absolute top-0 right-0 mt-4 mr-4">
              <Image
                src={x}
                height="40"
                width="100rem"
                className="cursor-pointer"
                alt="close"
                onClick={() => {
                  setIsUploadOpen(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {isShowOpen ? (
        <div className="text-xl flex flex-col z-50 px-[4rem] text-black rounded-2xl py-[5rem] bg-white ">
          <div className="w-full h-full flex flex-col text-center items-center ">
            <div className="bg-background-light rounded-full items-center align-center justify-center px-4 py-4 ">
              <Image
                src={upload}
                height="60"
                width="auto"
                alt="upload"
                className=" contrast-175"
              />
            </div>
            <h1 className="text-4xl font-semibold mt-20">
              Upload a single file or multiple files by uploading them here
            </h1>

            <div className="mt-20 flex bg-gray-50 px-4 py-4 border-2 border-gray-200 rounded-xl cursor-pointer">
              <Image
                src={upload}
                height="24"
                width="auto"
                alt="upload"
                className="mr-2"
              />
              <label className="cursor-pointer">
                Browse Files
                <input
                  ref={ref}
                  type="file"
                  className="hidden"
                  onChange={() => handleFileLoad()}
                />
                <h1>{progress - "2"}</h1>
              </label>
            </div>
          </div>

          <div className="absolute top-0 right-0 mt-4 mr-4">
            <Image
              src={x}
              height="40"
              width="100rem"
              className="cursor-pointer"
              alt="close"
              onClick={() => {
                setIsUploadOpen(false);
              }}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      
    </div>
  );
  
};

export default Upload;
