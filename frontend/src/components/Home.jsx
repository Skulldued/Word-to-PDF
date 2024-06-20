import React, { useState } from "react";
import images from "../assets/co.png";
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";
const Home = () => {
  const [selectedFile, setselectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");
  console.log(selectedFile);
  const handleChange = (e) => {
    setselectedFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setselectedFile("Please Select File");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      //  AXIOS HANDLE HTTP REQUEST

      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.],+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setselectedFile(null);
      setDownloadError("");
      setConvert("File Convert Successfully");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status == 400) {
        setDownloadError("Error Occured", error.response.data.message);
      } else {
        setConvert("");
      }
    }
  };
  return (
    <div className="container-fluid flex items-center px-3 py-10 md:py-20 ">
      <div className="container grid md:grid-cols-2   mx-auto">
        <div>
          <img src={images} alt="@dued" />
        </div>
        <div className="flex items-center">
          <div className="p-7 border-2 border-dashed rounded-md">
            <div className="text-center text-white ">
              <h2 className="font-semibold text-2xl">
                Convert Word to PDF Online
              </h2>
              <p className="py-4">
                Easily convert documents to pdf format online, without having
                install any software
              </p>
              <div className="flex flex-col justify-center items-center">
                <input
                  type="file"
                  onChange={handleChange}
                  className=" hidden p-4"
                  id="FileInput"
                  accept=".doc,.docx"
                />
                <label
                  htmlFor="FileInput"
                  className="w-full flex items-center justify-center px-4 py-4 bg-gray-100 text-gray-700 rounded-lg shadow-lg border-blue-300 hover:text-white cursor-pointer hover:bg-blue-700 duration-300"
                >
                  <FaFilePdf className="text-xl " />
                  <span className="text-xl px-2">
                    {selectedFile ? selectedFile.name : "choose File"}
                  </span>
                </label>
                <button
                  disabled={!selectedFile}
                  className="bg-blue-500 p-2 rounded-full disabled:bg-gray-500 disabled:pointer-events-none cursor-pointer my-3"
                  onClick={handleSubmit}
                >
                  Convert File
                </button>
                {convert && <div className="text-green-600">{convert}</div>}
                {downloadError && (
                  <div className="text-red-600">{downloadError}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
