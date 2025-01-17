// Importing required modules and components
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
  ArrowUpIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import VerticalNav from "../components/VerticalNav";
import CairLogo from "/public/CairHealthLogo.png";
import Bot from "/public/carbonbot.svg";
import { Amplify } from "aws-amplify";
import amplifyconfig from "../src/amplifyconfiguration.json";
import ClipLoader from "react-spinners/BeatLoader";
import ReactMarkdown from "react-markdown";
import RecentQueries_policies from "../components/RecentQueries_policies";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Dropdown from "../components/Dropdown";
import { getUrl } from "aws-amplify/storage";
import x from "../public/x-02.svg";
import { Transition } from "@headlessui/react";
import NotesSection from "../components/NotesSection";
import { Resizable, ResizableBox } from "react-resizable";
import line from "/public/line-chart-up-01.svg"

// Defining the Home component
const Home = () => {
  // State variables initialization using useState hook
  const [hasAnswered, setHasAnswered] = useState(false); // Indicates if the user has answered
  const [tutorial, setTutorial] = useState(true); // Indicates if the tutorial is being displayed
  const [inputValue, setInputValue] = useState(""); // Stores user input
  const [responseText, setResponseText] = useState("...try again"); // Stores response text
  const [returnQuery, setReturnQuery] = useState(""); // Stores return query
  const [sessionID, setSessionID] = useState(""); // Stores session ID
  const [loading, setLoading] = useState(false); // Indicates loading state
  const [history_policies, setHistory_policies] = useState([]); // Stores history of policies
  const [history, setHistory] = useState([]); // Stores general history

  // More state variables...
  const [currentQuery, setCurrentQuery] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [instructions, setInstructions] = useState(false);
  const [user, setUser] = useState("");
  const [faq, setFaq] = useState(false);
  const [progress, setProgress] = useState("");
  const [loadNumber, setLoadNumber] = useState(
    Math.floor(Math.random() * 5) + 1,
  );
  const [notes, setNotes] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [policiesFAQ, setPoliciesFAQ] = useState(false);
  const [contractsFAQ, setContractsFAQ] = useState(false);
  const [ratesFAQ, setRatesFAQ] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showInPage, setShowInPage] = useState(false);

  // Function to open a modal with content
  const openModal = (content) => {
    setModalContent(content);
    setShowInPage(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalContent(null);
  };

  // Ref to the bottom of the page
  const bottomOfPageRef = useRef();

  // Configuration for Amplify
  Amplify.configure(amplifyconfig);

  // Effect hook to start the chat session when the component mounts
  useEffect(() => {
    startChat();
  }, []);

  // Effect hook to parse user parameters from the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUser(params.get("user"));
  }, []);

  // Effect hook to scroll to the bottom of the page when chat history updates
  useEffect(() => {
    if (bottomOfPageRef.current) {
      bottomOfPageRef.current.scrollIntoView();
    }
  }, [history_policies]);

  // Effect hook to check the status of the chat session
  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Wait for the fetch request to resolve
        // Now that the response has been received, proceed with status checks
        while (progress !== "Completed.") {
          const statusResponse = await fetch(
            "https://chat.cairhealth.com/get_status/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                session_id: sessionID,
              }),
              redirect: "follow",
            },
          );

          const stattext = await statusResponse.text();
          console.log(stattext);
          setProgress(stattext);

          // If not completed, schedule next check after 1 second
          if (stattext !== "Completed.") {
            await new Promise((resolve) => setTimeout(resolve, 4000));
          }
        }
      } catch (error) {
        console.error("Error occurred while fetching response:", error);
      }
    };
    checkStatus();
  }, [loading]);

  // Effect hook to update load number based on progress
  useEffect(() => {
    const loadSetter = (progress) => {
      if (progress === "Stage 1.") {
        setLoadNumber(Math.floor(Math.random() * 25) + 1);
      } else if (progress === "Stage 2.") {
        setLoadNumber(Math.floor(Math.random() * 25) + loadNumber);
      } else if (progress === "Stage 3.") {
        setLoadNumber(Math.floor(Math.random() * 25) + loadNumber);
      } else if (progress === "Stage 4.") {
        setLoadNumber(Math.floor(Math.random() * 25) + loadNumber);
      } else if (progress === "Stage 5.") {
        setLoadNumber(Math.floor(Math.random() * 1) + 95);
      }
    };
    loadSetter(progress);
  }, [progress]);


  // State variable for selected document type
  const [selectedDocType, setSelectedDocType] = useState("Policies");

  // Function to handle document type change
  const handleDocTypeChange = (value) => {
    setSelectedDocType(value);
  };

  // Function to start the chat session
  const startChat = async () => {
    try {
      const requestOptions = {
        method: "PUT",
        redirect: "follow",
      };
      const response_policies = await fetch(
        "https://chat.cairhealth.com/start_chat/",
        requestOptions,
      );

      if (!response_policies.ok) {
        throw new Error("Failed to start");
      }
      const result = await response_policies.text();

      setSessionID(result);
      // Now you can use the sessionID in your application
      console.log("Session ID", result);

      // Other logic related to getting a response
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  // Function to handle click on paper plane icon
  const handlePaperPlaneClick = async () => {
    setNotes(false);
    setLoadNumber(Math.floor(Math.random() * 5) + 1);
    console.log("started");
    setLoading(true); // Set loading state to true when making the request
    setReturnQuery(inputValue);
    setHasAnswered(true);
    setCurrentQuery(inputValue);
    setInputValue("");

    console.log(selectedDocType);
    console.log(inputValue);
    try {
      const getResponseOptions_policies = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: inputValue,
          customer_id: "demo",
          session_id: sessionID,
        }),
        redirect: "follow",
      };

      const getResponseOptions_contracts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: inputValue,
          customer_id: "demo",
          session_id: sessionID,
        }),
        redirect: "follow",
      };

      const getResponseOptions_rates = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: inputValue,
          customer_id: "demo",
          session_id: sessionID,
        }),
        redirect: "follow",
      };

      let getResponseResponse;

      if (selectedDocType === "Policies") {
        console.log("step1");

        // Start fetching response
        getResponseResponse = await fetch(
          "https://chat.cairhealth.com/get_response_policies/",
          getResponseOptions_policies,
        );

        // Start checking status
      }

      if (selectedDocType === "Contracts") {
        getResponseResponse = await fetch(
          "https://chat.cairhealth.com/get_response_contracts/",
          getResponseOptions_contracts,
        );
      }

      if (selectedDocType === "Rates") {
        getResponseResponse = await fetch(
          "https://chat.cairhealth.com/get_response_rates/",
          getResponseOptions_rates,
        );
      }

      if (!getResponseResponse.ok) {
        throw new Error("Failed to get response");
      }

      const getResponseResult = await getResponseResponse.text();

      const jsonAnswer = JSON.parse(getResponseResult);
      let answer = jsonAnswer.answer;

      const urlRegex = /https?:\/\/[^)\s]+/g;
      const urls = answer.match(urlRegex);
      if (urls) {
        for (const url of urls) {
          // Process URL to get S3 key
          const s3Key = url
            .split("/")
            .pop()
            .replace(/%20/g, " ")
            .replace(/%28/g, "(")
            .replace(/%26/g, "&")
            .replace(/%29/g, ")")
            .replace(/,$/, ""); // Get last part of the URL and replace %20 with spaces

          // Call your API with the S3 key
          try {
            const getUrlResult = await getUrl({
              key: s3Key,
              options: {
                accessLevel: "guest", // can be 'private', 'protected', or 'guest' but defaults to `guest` // defaults to false
              },
            });

            answer = answer.replace(url, getUrlResult.url);
            console.log(getUrlResult.url)
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        answer = answer;
      }

      const question1 = jsonAnswer.questions[0];
      const question2 = jsonAnswer.questions[1];
      const question3 = jsonAnswer.questions[2];
      setQuestion1(question1);
      setQuestion2(question2);
      setQuestion3(question3);

      const notes = jsonAnswer.notes;
      setNoteContent(notes);
      console.log(notes);

      setResponseText(answer[0]);
      const responseStreaming = (answer) => {
        let index = 0;
        const interval = setInterval(() => {
          if (index < answer.length - 1) {
            setResponseText(
              (prevResponseText) => prevResponseText + answer[index],
            );
            index++;
          } else {
            clearInterval(interval);
          }
        }, 10);
      };

      setResponseText(answer.replace("NO DATE FOUND,", ""));

      // Store the current query and response in the history

      if (selectedDocType === "Rates") {
        setHistory_policies([
          ...history_policies,
          { query: inputValue, response: answer },
        ]);
      }

      if (selectedDocType === "Policies") {
        setHistory_policies([
          ...history_policies,
          { query: inputValue, response: answer },
        ]);
      }

      if (selectedDocType === "Contracts") {
        setHistory_policies([
          ...history_policies,
          { query: inputValue, response: answer },
        ]);
      }
    } catch (error) {
      console.error("Error getting response:", error);
      setResponseText("Failed to get response due to server error: 500");
    } finally {
      setLoading(false);
    }
  };

  // Call the startChat function when your application needs to start a new chat

  return (
    <>
      {/*!authenticated ? (
       <div>
         <h1>Please Enter Password:</h1>
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
       </div>
   ) : */}
      <div className="h-screen text-black flex bg-white">
        {/* sidebar div*/}
        {/* sidebar extends full height of screen and is using rounded property because I'm trying to overlap it with the top nav */}
        <VerticalNav
          onDocTypeChange={handleDocTypeChange}
          user={user}
          className=""
        />

        <Transition
          show={faq}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="border pt-10 h-full overflow-auto border-gray-400 absolute right-0 opacity-97 lg:w-[24rem] md:w-[35rem] sm:w-[40rem] flex flex-col items-start"
            style={{ background: "#F2F4F5", zIndex: 998 }}
          >
            <div className="p-12 flex flex-row">
              <Image
                src={x}
                width="auto"
                height="auto"
                alt="leave"
                className="cursor-pointer hover:focus"
                onClick={() => setFaq(false)}
                style={{ zIndex: 999 }}
              />
              <h1 className="pl-1 text-xl">FAQ</h1>
            </div>
            <div className="pl-4 flex flex-col  w-full">
              <h1 className=" font-semibold border-b-2 border-gray-300">
                How do you use Cair Assistant?
              </h1>
              <div className="justify-center pt-4 align-center">
                <h1 className="font-semibold">For all Modes:</h1>
                <div className="w-[95%] py-5 px-3 rounded-xl border-dashed border-2 border-gray-300">
                  <p className="pb-4">
                    1. We will only accept questions related to medical
                    (health/dental/pharmaceutical/etc.) insurance.
                  </p>
                  <p className="pb-4">
                    2. The more specific you are with your questions, the
                    better. Our co-pilots aim to provide solely definitive
                    information and can give you the most accurate answers when
                    you include all the details you know, like payer name, plan
                    name, location, etc.
                  </p>
                  <p>
                    3. While our model can handle queries that reference
                    previous ones, we recommend inputting standalone queries to
                    ensure all desired details are captured.
                  </p>
                </div>

                <div
                  className="font-semibold bg-white py-4 mr-16 pl-1 mt-4 rounded-xl justify-between flex flex-grow flex-row border border-gray-400 cursor-pointer hover:bg-brand-primary-100"
                  onClick={() => setPoliciesFAQ(!policiesFAQ)}
                >
                  <h1 className=" ">Policies Mode FAQ</h1>
                  <ChevronDownIcon
                    className="mr-1 h-5 w-5 text-gray-400 "
                    aria-hidden="true"
                  />
                </div>
                <Transition
                  show={policiesFAQ}
                  enter="transition-opacity duration-75"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="w-[90%] py-4 px-2  rounded-xl border-2 border-dashed border-gray-300">
                    <div>
                      <p>When applicable, include details such as…</p>
                      <ul>
                        <li>a. Insurance Payer</li>
                        <li>b. Insurance Plan</li>
                        <li>c. Location</li>
                      </ul>
                      <p className="font-semibold pt-2">Example Queries:</p>
                      <ol>
                        <li className="pb-4">
                          1. What is the cost of an inpatient psychiatric stay
                          if you enroll in Aetna&apos;s Choice PPO Plan in
                          California?
                        </li>
                        <li>
                          2. I live in California and my insurance provider is
                          Aspire Health Plan. I&apos;m considering enrolling in
                          Aspire Health&apos;s PROTECT HMO Plan. What are the
                          membership eligibility criteria and which zip codes
                          are serviced?
                        </li>
                      </ol>
                    </div>
                  </div>
                </Transition>

                <div
                  className="font-semibold bg-white py-4 mr-16 pl-1 mt-4 rounded-xl justify-between flex flex-grow flex-row border border-gray-400 cursor-pointer hover:bg-brand-primary-100"
                  onClick={() => setContractsFAQ(!contractsFAQ)}
                >
                  <h1 className=" ">Contracts Mode FAQ</h1>
                  <ChevronDownIcon
                    className="mr-1 h-5 w-5 text-gray-400 "
                    aria-hidden="true"
                  />
                </div>
                <Transition
                  show={contractsFAQ}
                  enter="transition-opacity duration-75"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="w-[90%] py-4 px-2  rounded-xl border-2 border-dashed border-gray-300">
                    <div>
                      <p>When applicable, include details such as…</p>
                      <ul>
                        <li>a. Insurance Payer</li>
                        <li>b. Insurance Plan</li>
                        <li>c. Hospital Provider</li>
                        <li>c. Location</li>
                      </ul>
                      <p className="font-semibold pt-2">Example Query:</p>
                      <ol>
                        <li>
                          What definition of &quot;Medical Necessity&quot;
                          applies to individuals not covered by EPSDT according
                          to the Anthem BlueCross Provider Agreement with El
                          Camino Health in Mountain View, CA?
                        </li>
                      </ol>
                    </div>
                  </div>
                </Transition>

                <div
                  className="font-semibold bg-white py-4 mr-16 pl-1 mt-4 rounded-xl justify-between flex flex-grow flex-row border border-gray-400 cursor-pointer hover:bg-brand-primary-100"
                  onClick={() => setRatesFAQ(!ratesFAQ)}
                >
                  <h1 className=" ">Rates Mode FAQ</h1>
                  <ChevronDownIcon
                    className="mr-1 h-5 w-5 text-gray-400 "
                    aria-hidden="true"
                  />
                </div>
                <Transition
                  show={ratesFAQ}
                  enter="transition-opacity duration-75"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="w-[90%] py-4 px-2  rounded-xl border-2 border-dashed border-gray-300">
                    <div>
                      <p>When applicable, include details such as…</p>
                      <ul>
                        <li>a. Insurance Payer</li>
                        <li>b. Insurance Plan</li>
                        <li>c. Hospital Provider</li>
                        <li>d. Healthcare Provider NPI</li>
                        <li>
                          e. “[CPT/HCPCS/Local] code” if asking about a specific
                          code{" "}
                        </li>
                        <li>g. Relevant Modifiers </li>
                        <li>h. Location (State) </li>
                        <li>i. Taxonomy Code/Description</li>
                      </ul>
                      <p className="font-semibold pt-2">Example Queries:</p>
                      <ol>
                        <li className="pb-4">
                          1. What is the professional rate for Aetna and Ojai
                          Valley Community Health Center for HCPCS code E2312
                          with modifier MS for a claim in CA and for NPI
                          1063446896 across Taxonomy 208VP0014X Interventional
                          Pain Medicine Physician?
                        </li>
                        <li>
                          2. What is the institutional rate for Aetna and El
                          Camino Hospital and for local code SURG054 for a claim
                          in CA and for NPI 1093712374 across Taxonomy
                          282N00000X General Acute Care Hospital?
                        </li>
                      </ol>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </Transition>

        <Transition
          show={showInPage}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Resizable direction="vertical">
            <div
              className="border pt-24 h-[90%] w-1/3 overflow-auto border-gray-400 absolute right-0 opacity-97  flex flex-col items-start resize"
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
                  src={modalContent}
                  className=""
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </Resizable>
        </Transition>

        {/* End of Sidebar content */}
        <div className="relative flex flex-1 flex-col h-full">
          {!hasAnswered && (
            <div className="flex flex-col space-y-4 justify-center items-center inset-x-0 top-0 bottom-0"></div>
          )}

          {/* Cair Banner */}

          <div style={{ zIndex: 1000 }}>
            <div
              className="relative flex border-gray-200 shadow-md"
              style={{ backgroundColor: "#40929B", height: "6vh" }}
            >
              <div className="w-full flex items-center justify-between mx-auto p-5">
                <Image
                  src={CairLogo}
                  width={250}
                  height="auto"
                  alt="Not found"
                ></Image>
                <span className="self-center text-2xl font-semibold dark:text-white"></span>

                <div
                  className="hidden w-full md:block md:w-auto"
                  id="navbar-default"
                >
                  {!user ? (
                    <Link href="/log-in">
                      <button className="bg-green-50 rounded-3xl px-5 py-2 font-semibold text-xl">
                        Log In
                      </button>
                    </Link>
                  ) : (
                    <h1 className="bg-green-50 rounded-3xl px-5 py-2 font-semibold text-xl">
                      {user}
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>

          {hasAnswered && (
            <div className="flex flex-col pt-5 text-black overflow-auto pb-40 ">
              {/* Recent Queries Component */}
              {history.length >= 0 && (
                <div className="pl-[7.9%] mx-auto w-full ">
                  <RecentQueries_policies
                    history={history_policies}
                    currentQuery={currentQuery}
                  />
                </div>
              )}

              {/* New Query and Response Section */}
              <div className="pl-[8%] w-full flex items-center  pb-1">
                <div className="h-10 w-10 bg-indigo-500 text-center p-1 px-2 rounded-full text-white text-lg">
                  Pr
                </div>
                <div className="flex space-x-4 items-center justify-between px-6 py-6 w-4/5">
                  <div className="flex space-x-4 items-center">
                    {/* User Query */}
                    <p
                      className="font-semibold"
                      style={{
                        fontSize: "20px",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {returnQuery}
                    </p>
                  </div>
                  <PencilSquareIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => setInputValue(returnQuery)}
                  />
                </div>
              </div>

              <div
                className="pl-[8%] w-full flex items-center border-t border-b"
                style={{ background: "#ECF5F6" }}
              >
                <div className="flex items-center justify-center h-10 w-10 bg-teal-600 rounded-full text-white relative">
                  <Image src={Bot} height="30" width="30" alt="bot" />
                </div>
                <div className="flex space-x-4 items-center justify-between px-6 py-6 w-4/5">
                  <div className="flex space-x-4 items-center">
                    <div
                      style={{
                        fontSize: "20px",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {loading ? (
                        <div className="flex flex-row">
                          <ClipLoader
                            css={{
                              display: "block",
                              margin: "0 auto",
                              borderColor: "red",
                            }}
                            size={15}
                            color={"#40929B"}
                            loading={loading}
                            speedMultiplier={1.5}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />

                          <h1 className="pl-4 text-teal-700 text-xl font-semibold">
                            {loadNumber}%
                          </h1>
                        </div>
                      ) : (
                        <div>
                          <div>
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: (props) => {
                                  const handleClick = (e) => {
                                    e.preventDefault();
                                    openModal(props.href);
                                  };

                                  return props.href.startsWith("https://") ? (
                                    <a
                                      href="#"
                                      className="text-teal-800 underline"
                                      onClick={handleClick}
                                    >
                                      See Source
                                    </a>
                                  ) : (
                                    <a
                                      href={props.href}
                                      className="text-teal-600 underline"
                                    >
                                      {props.children}
                                    </a>
                                  );
                                },
                              }}
                            >
                              {responseText}
                            </ReactMarkdown>
                          </div>
                          <p className="mt-[1.5rem] font-semibold">
                            Related Questions:
                          </p>
                          <div className="pt-[1rem] pb-[1rem] flex gap-10">
                            <div
                              className="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-50 hover:bg-gray-300 cursor-pointer border-2 border-teal-700 items-center justify-center"
                              onClick={() => setInputValue(question1)}
                            >
                              <div className="px-6 ">
                                <div className="font-bold text-xl mb-2 "></div>
                                <p className="text-gray-700 text-base  ">
                                  {question1}
                                </p>
                              </div>
                            </div>

                            <div
                              className="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-50 hover:bg-gray-300 cursor-pointer border-2 border-teal-700 items-center justify-center"
                              onClick={() => setInputValue(question2)}
                            >
                              <div className="px-6">
                                <div className="font-bold text-xl mb-2"></div>
                                <p className="text-gray-700 text-base">
                                  {question2}
                                </p>
                              </div>
                            </div>

                            <div
                              className="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-50 hover:bg-gray-300 cursor-pointer border-2 border-teal-700"
                              onClick={() => setInputValue(question3)}
                            >
                              <div className="px-6">
                                <div className="font-bold text-xl mb-2"></div>
                                <p className="text-gray-700 text-base">
                                  {question3}
                                </p>
                              </div>
                            </div>
                          </div>
                          See Notes:{" "}
                          <BookOpenIcon
                            className="mx-2 h-6 w-6 cursor-pointer"
                            onClick={() => setNotes(!notes)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <HandThumbUpIcon className="h-6 w-6" />
                    <HandThumbDownIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <Transition
                show={notes}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="py-3 flex flex-col bg-teal-50 pl-56 pr-24 border-b-2 border-dashed rounded-2xl border-gray-500"
                  style={{ background: "#faffff" }}
                >
                  <h1 className="font-bold text-xl text-black pb-3">
                    Model Notes:
                  </h1>

                  <div className="">
                    <NotesSection note={noteContent} />
                  </div>
                </div>
              </Transition>

              <div className=" bg-red-500" ref={bottomOfPageRef}>
                {" "}
              </div>
            </div>
          )}

          {instructions && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div
                className="bg-black bg-opacity-50 absolute inset-0"
                onClick={() => setInstructions(false)}
              ></div>
              <div className="text-black border border-gray-200 bg-white flex justify-center items-center space-x-2 shadow-md rounded px-2">
                {/* Popup content */}
                <div className="bg-white opacity-100">
                  This is where the instructions would go
                </div>
                <button onClick={() => setInstructions(false)}>Close</button>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 inset-x-0 mx-auto px-2 my-4 max-w-3xl">
            <Dropdown
              setSelectedDocType={setSelectedDocType}
              selectedDocType={selectedDocType}
            />

            <div className="text-black border border-gray-400 flex justify-center items-center shadow-md rounded-xl  px-2">
              <textarea
                className="flex-1 bg-white  border-0 text-xl focus:outline-none rounded-2xl resize-y"
                style={{ minHeight: "20px", resize: "none" }}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setTutorial(!e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handlePaperPlaneClick(); // Assuming this function handles submission
                  }
                }}
              />
              <QuestionMarkCircleIcon
                stroke="gray"
                stroke-width="2"
                className="h-8 w-8 rounded-lg p- m-1 text-right  cursor-pointer bg-gray-300 border-2 border-gray-400"
                onClick={() => {
                  setFaq(!faq);
                }}
              />

              <ArrowUpIcon
                stroke="#C7E2E5"
                stroke-width="2"
                className="h-8 w-8 rounded-lg p-1 m-1 text-right  cursor-pointer bg-brand-primary-500 border-2 border-brand-primary-600"
                onClick={() => {
                  handlePaperPlaneClick();
                }}
              />
            </div>
          </div>

          {!hasAnswered && tutorial && (
            <div className="flex flex-col pt-7 items-center">
              <h1 className="text-4xl font-semibold">Hello,</h1>
              <span className="flex flex-row">
                <h1 className="text-4xl pt-2 font-semibold">{`How can I assist you today `}</h1>
                <h1 className="text-4xl pl-2 pt-2 font-semibold text-brand-primary-600">
                  {user}
                </h1>
                <h1 className="text-4xl pl-2 pt-2 font-semibold">{`?`}</h1>
              </span>
              <div className="flex flex-row">
                <div
                  className="max-w-sm my-4 rounded-xl hover:border-brand-primary-500 overflow-hidden shadow-2xl border-2 border-gray-400 items-center justify-center cursor-pointer"
                  onClick={() => {
                    setSelectedDocType("Policies");
                    setTutorial(false);
                  }}
                >
                  <div className="px-6 py-4 hover:bg-brand-primary-100 ">
                    <div className="font-semibold text-2xl mb-2">Policies</div>
                    <p className="text-black">Ask questions about policies</p>
                  </div>
                </div>

                <div
                  className="max-w-sm my-4 mx-7 rounded-xl overflow-hidden shadow-2xl border-2 hover:border-brand-primary-500 border-gray-400 items-center justify-center cursor-pointer"
                  onClick={() => {
                    setSelectedDocType("Contracts");
                    setTutorial(false);
                    console.log("contracts");
                  }}
                >
                  <div className="px-6 py-4 hover:bg-brand-primary-100">
                    <div className="font-semibold text-2xl mb-2">Contracts</div>
                    <p className="text-black">Ask questions about contracts</p>
                  </div>
                </div>

                <div
                  className="max-w-sm my-4 rounded-xl overflow-hidden shadow-2xl border-2 hover:border-brand-primary-500 border-gray-400 items-center justify-center cursor-pointer"
                  onClick={() => {
                    setSelectedDocType("Rates");
                    setTutorial(false);
                  }}
                >

                  <Link href = {`/rates-builder?user=${user}`}>
                  <div className="px-4 py-4 hover:bg-brand-primary-100">
                    <div className="font-semibold text-2xl mb-2 flex flex-row">Rates-Mode
                    <div className = "pl-4">
                    <Image src = {line} width = "30" height = "auto" alt = "line graph"/>
                    </div>
                    
                    </div>

                    <p className="text-black">Access Our Beta Rates-Builder</p>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
