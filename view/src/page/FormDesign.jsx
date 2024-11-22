/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

function FormDesign() {
  const signatureRef = useRef();
  const [signatureImage, setSignatureImage] = useState(null);
  const [formData, setFormData] = useState({
    jmStaffEngineer: {
      _id: "673b2c7b3137bd8e4c363e2b",
      name: "pruthvij",
      email: "pruttdu@gmail.com",
    },
    time: "2:30",
    clientName: "",
    architectName: "",
    siteVisitCheckingDetails: "",
    sitePhotos: [],
    additionalRemarks: "",
    specificNonCompliances: "",
    modificationPhotos: [],
    clientRepresentativeName: "",
    contractorRepresentativeName: "",
    /* signature: null, */
  });
  const [numImages, setNumImages] = useState(0);
  const [numImagesm, setNumImagesm] = useState(0);
  const [checklist, setChecklist] = useState({
    propsTightAndStraight: false,
    defectiveMaterialsReplaced: false,
    formworkCleaned: false,
    formworkWatertight: false,
    formworkslabchhajja: false,
    columnBeamSecured: false,
    coverProvided: {
      columnReinforcement: false,
      beamBottoms: false,
      beamSlides: false,
      slabBottom: false,
      chajjaSlabSlides: false,
    },
    chairsProvided: false,
    spacerBarsProvided: false,
    columnRingsProvided: false,
    dowelBarsProvided: {
      elevationPurdies: false,
      hangerColumn: false,
      futureBeamSlabStaircaseFlights: false,
    },
    cubeSamplesTaken: false,
    noChamberInBeamSlab: false,
    shoringShuttingDone: false,
    basementHolesPermission: false,
    reinforcementTested: false,
    formworkStriking: false,
    slabUnderPropped: false,
    ptBeamsFormwork: false,
    ptBeamsDimensions: false,
    slabThicknessUnderpropped: false,
  });
  const labelMapping = {
    propsTightAndStraight:
      "All props are tight, straight, vertical, and adequately braced.",
    defectiveMaterialsReplaced:
      "Twisted, defective, spliced, damaged, decayed props, planks, plates, plywood, etc., are removed/replaced.",
    formworkCleaned: "Formwork is cleaned thoroughly.",
    formworkWatertight: "Formwork is watertight.",
    formworkslabchhajja:
      "Formwork of slabs, chhajja etc is in level and ensured strong enough to take the loads and thrusts",
    columnBeamSecured:
      "Formwork of columns and beams is in line, plumb, and secured against loads and thrust.",
    coverProvided: {
      columnReinforcement: "Column reinforcement",
      beamBottoms: "Beam bottoms",
      beamSlides: "Beam sides",
      slabBottom: "Slab bottom",
      chajjaSlabSlides: "Chajja, slab sides",
    },
    chairsProvided: "Adequate & appropriate chairs are provided.",
    spacerBarsProvided:
      "Adequate & appropriate spacer bars are provided between two layers of reinforcement in beams.",
    columnRingsProvided:
      "Column rings/ties are provided at beam junctions for full depth of the beam.",
    dowelBarsProvided: {
      elevationPurdies: "Elevation purdies & up stands",
      hangerColumn: "Hanger columns, stub columns",
      futureBeamSlabStaircaseFlights:
        "Dowel bars provided for future beams, slabs, and staircase flights.",
    },
    cubeSamplesTaken:
      "Cube samples shall be taken as per IS: 456-2000. Test reports are submitted to consultants.",
    noChamberInBeamSlab:
      "No camber shall be provided in beams & slabs unless noted otherwise & specifically approved by the consultant in writing.",
    shoringShuttingDone:
      "Proper shoring & strutting to all sides of excavation is done.",
    basementHolesPermission:
      "Necessary holes are provided in the basement raft with prior permission of the consultants.",
    reinforcementTested:
      "The lot of reinforcement in use is tested in the laboratory, and the reports are submitted to the consultant.",
    formworkStriking:
      "Striking of formwork shall only be started after 70% of the characteristic strength of concrete is established.",
    slabUnderPropped: "Slab under-propped adequately.",
    ptBeamsFormwork:
      "Centering, shuttering & formwork of PT beams & PT slabs shall not be removed until stressing and grouting is completed by PT agency.",
    ptBeamsDimensions:
      "The dimension and reinforcement of PT beams & slabs are checked & certified by PT Agency.",
    slabThicknessUnderpropped:
      "For all slabs thicker than 150 mm, the immediate lower slab shall also be under propped condition.",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // Split the name on "." to check for nested properties
      const keys = name.split(".");

      if (keys.length > 1) {
        // Nested property, e.g., "jmStaffEngineer.name"
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      } else {
        // Top-level property
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const getLabel = (key, parentKey = null) => {
    if (parentKey) {
      return labelMapping[parentKey]?.[key] || key; // Nested key
    }
    return labelMapping[key] || key; // Top-level key
  };
  // Split items into two arrays for left and right tables
  const allItems = Object.entries(labelMapping).reduce((acc, [key, value]) => {
    if (typeof value === "object") {
      Object.entries(value).forEach(([subKey, subLabel]) => {
        acc.push({
          key: `${key}.${subKey}`,
          label: subLabel,
          checked: checklist[key]?.[subKey] || false,
        });
      });
    } else {
      acc.push({
        key,
        label: value,
        checked: checklist[key] || false,
      });
    }
    return acc;
  }, []);

  const midpoint = Math.ceil(allItems.length / 2);
  // const leftTableItems = allItems.slice(0, midpoint);
  // const rightTableItems = allItems.slice(midpoint);
  const areAllNestedChecked = (nestedItems) => {
    return Object.values(nestedItems).every((value) => value === true);
  };
  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;

    setChecklist((prev) => {
      const newChecklist = { ...prev };

      if (name.includes(".")) {
        // Handle nested checkbox change
        const [parent, child] = name.split(".");
        newChecklist[parent] = {
          ...newChecklist[parent],
          [child]: checked,
        };

        // Update parent checkbox based on all nested items
        newChecklist[parent].checked = areAllNestedChecked(
          newChecklist[parent]
        );
      } else if (typeof newChecklist[name] === "object") {
        // Handle parent checkbox change
        const updatedNested = {};
        Object.keys(newChecklist[name]).forEach((key) => {
          updatedNested[key] = checked;
        });
        newChecklist[name] = {
          ...updatedNested,
          checked: checked,
        };
      } else {
        // Handle regular checkbox change
        newChecklist[name] = checked;
      }

      return newChecklist;
    });
  };

  const ChecklistTable = ({ items }) => {
    const renderNestedItem = (key, label, checked, subItems) => {
      // Check if this is a parent item with nested checkboxes
      const hasNestedItems = subItems && typeof subItems === "object";

      // For parent items, compute checked state based on nested items
      const isParentChecked = hasNestedItems
        ? areAllNestedChecked(checklist[key])
        : checked;

      return (
        <div key={key} className="checklist-item">
          {/* Parent item */}
          <div className="flex items-center parent-item p-3 border rounded-lg mb-2 bg-gray-50">
            <input
              type="checkbox"
              name={key}
              checked={isParentChecked}
              onChange={handleChecklistChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
            />
            <span className="font-medium">{label}</span>
          </div>

          {/* Nested items */}
          {hasNestedItems && (
            <div className="nested-items ml-6 space-y-2 mb-4">
              {Object.entries(subItems).map(([subKey, subLabel]) => (
                <div
                  key={`${key}.${subKey}`}
                  className="flex items-center nested-item p-2 border-l-2 border-gray-300 pl-4"
                >
                  <input
                    type="checkbox"
                    name={`${key}.${subKey}`}
                    checked={checklist[key][subKey] || false}
                    onChange={handleChecklistChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                  />
                  <span className="text-gray-700">{subLabel}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="checklist-container p-4 bg-white rounded-lg shadow">
        {items.map(({ key, label, checked, subItems }) =>
          renderNestedItem(key, label, checked, subItems)
        )}
      </div>
    );
  };

  // Modify how items are processed to maintain nested structure
  const processChecklistItems = () => {
    const items = [];
    Object.entries(labelMapping).forEach(([key, value]) => {
      if (typeof value === "object") {
        // Format the parent label to be more readable
        const formattedLabel = key
          .split(/(?=[A-Z])/)
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

        items.push({
          key,
          label: formattedLabel,
          checked: checklist[key] || false,
          subItems: value,
        });
      } else {
        items.push({
          key,
          label: value,
          checked: checklist[key] || false,
        });
      }
    });

    const midpoint = Math.ceil(items.length / 2);
    return {
      leftTableItems: items.slice(0, midpoint),
      rightTableItems: items.slice(midpoint),
    };
  };

  const { leftTableItems, rightTableItems } = processChecklistItems();

  // Handle signature canvas save as image
  const handleSaveSignature = () => {
    const signatureData = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setSignatureImage(signatureData); // Store the Base64 image in the state

    // Send the Base64 image to the backend (for example, saving it)

    // Assign the Base64 image to formData
    formData.signature = signatureData;
    console.log("Signature saved to formData:", formData);
  };
  const handleClearSignature = () => {
    signatureRef.current.clear(); // Clear the canvas
    setSignatureImage(null); // Reset image state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append basic fields
    formDataToSend.append("jmStaffEngineer", formData.jmStaffEngineer._id);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("clientName", formData.clientName);
    formDataToSend.append("architectName", formData.architectName);
    formDataToSend.append(
      "siteVisitCheckingDetails",
      formData.siteVisitCheckingDetails
    );
    formDataToSend.append(
      "additionalRemarks",
      formData.additionalRemarks || ""
    );
    formDataToSend.append(
      "specificNonCompliances",
      formData.specificNonCompliances
    );
    formDataToSend.append(
      "clientRepresentativeName",
      formData.clientRepresentativeName || ""
    );
    formDataToSend.append(
      "contractorRepresentativeName",
      formData.contractorRepresentativeName || ""
    );

    // Append checklist as a stringified object

    /*  formDataToSend.append("checklist", JSON.stringify(formData.checklist)); */
    // Handle nested checklist data by flattening it
    const flattenChecklist = (obj, prefix = "") => {
      return Object.keys(obj).reduce((acc, key) => {
        const propName = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === "object" && obj[key] !== null) {
          return { ...acc, ...flattenChecklist(obj[key], propName) };
        }
        return { ...acc, [propName]: obj[key] };
      }, {});
    };

    const flattenedChecklist = flattenChecklist(checklist);

    // Append each checklist item individually
    Object.entries(flattenedChecklist).forEach(([key, value]) => {
      formDataToSend.append(`checklist[${key}]`, value);
    });
    // Append site photos
    if (formData.sitePhotos && formData.sitePhotos.length > 0) {
      formData.sitePhotos.forEach((photo) => {
        if (photo) {
          formDataToSend.append("sitePhotos", photo);
        }
      });
    }

    // Append modification photos
    if (formData.modificationPhotos && formData.modificationPhotos.length > 0) {
      formData.modificationPhotos.forEach((photo) => {
        if (photo) {
          formDataToSend.append("modificationPhoto", photo);
        }
      });
    }

    // If you're using signature canvas
    if (signatureRef.current) {
      // Convert client signature to blob
      const clientSignatureBlob = await new Promise((resolve) => {
        const canvas = signatureRef.current.getTrimmedCanvas();
        canvas.toBlob(resolve, "image/png");
      });
      if (clientSignatureBlob) {
        formDataToSend.append(
          "clientsign",
          clientSignatureBlob,
          "clientSignature.png"
        );
      }
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/sitereport",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        alert("Form submitted successfully!");
        localStorage.removeItem("formData");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.response?.data?.message || "Error submitting form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      /* className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-md" */
    >
      <div className="bg-white  border-4 rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Create New Report Here</h3>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="jmStaffEngineer"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Jm Staff Engineer Name
              </label>
              <input
                type="text"
                name="jmStaffEngineer"
                id="jmStaffEngineer"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Full Name"
                required=""
                value={formData.jmStaffEngineer.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="clientName"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                clientName
              </label>
              <input
                type="text"
                name="clientName"
                id="clientName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="clientName"
                required=""
                value={formData.clientName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="architectName"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                architectName
              </label>
              <input
                type="text"
                name="architectName"
                value={formData.architectName}
                onChange={handleInputChange}
                id="architectName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="architectName"
                required=""
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="additionalRemarks"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Additional Remarks
              </label>
              <textarea
                name="additionalRemarks"
                value={formData.additionalRemarks}
                onChange={handleInputChange}
                id="additionalRemarks"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Add your remarks here"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="specificNonCompliances"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Specific Non-Compliances
              </label>
              <textarea
                name="specificNonCompliances"
                value={formData.specificNonCompliances}
                onChange={handleInputChange}
                id="specificNonCompliances"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Describe any specific non-compliances here"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="clientRepresentativeName"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                clientRepresentativeName
              </label>
              <input
                type="text"
                name="clientRepresentativeName"
                value={formData.clientRepresentativeName}
                onChange={handleInputChange}
                id="clientRepresentativeName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="clientRepresentativeName"
                required=""
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="contractorRepresentativeName"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                contractorRepresentativeName
              </label>
              <input
                type="text"
                name="contractorRepresentativeName"
                value={formData.contractorRepresentativeName}
                onChange={handleInputChange}
                id="contractorRepresentativeName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="contractorRepresentativeName"
                required=""
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="siteVisitCheckingDetails"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Site Visit Checking Details
              </label>
              <textarea
                name="siteVisitCheckingDetails"
                value={formData["siteVisitCheckingDetails"]}
                onChange={handleInputChange}
                id="siteVisitCheckingDetails"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Provide details of the site visit checking here"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="numImages"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                How many site photos to upload?
              </label>
              <input
                type="number"
                id="numImages"
                min="0"
                value={numImages}
                onChange={(e) => {
                  setNumImages(Number(e.target.value));
                  setFormData((prev) => ({
                    ...prev,
                    sitePhotos: Array(Number(e.target.value)).fill(null), // Reset the sitePhotos array
                  }));
                }}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {Array.from({ length: numImages }).map((_, index) => (
                  <div key={index} className="mb-4">
                    <label className="block font-medium mb-2">
                      Upload Site Photo {index + 1}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFormData((prev) => {
                          const updatedSitePhotos = [...prev.sitePhotos];
                          updatedSitePhotos[index] = file;
                          return { ...prev, sitePhotos: updatedSitePhotos };
                        });
                      }}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {formData.sitePhotos[index] && (
                      <img
                        src={URL.createObjectURL(formData.sitePhotos[index])}
                        alt={`Preview ${index + 1}`}
                        className="mt-2 w-32 h-32 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="numImages"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                How many modification Photo to upload?
              </label>
              <input
                type="number"
                id="numImagesm"
                min="0"
                value={numImagesm}
                onChange={(e) => {
                  setNumImagesm(Number(e.target.value));
                  setFormData((prev) => ({
                    ...prev,
                    modificationPhotos: Array(Number(e.target.value)).fill(
                      null
                    ), // Reset the sitePhotos array
                  }));
                }}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {Array.from({ length: numImagesm }).map((_, index) => (
                  <div key={index} className="mb-4">
                    <label className="block font-medium mb-2">
                      Upload modification Photo {index + 1}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFormData((prev) => {
                          const updatedModificationPhotos = [
                            ...prev.modificationPhotos,
                          ];
                          updatedModificationPhotos[index] = file;
                          return {
                            ...prev,
                            modificationPhotos: updatedModificationPhotos,
                          };
                        });
                      }}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {formData.modificationPhotos[index] && (
                      <img
                        src={URL.createObjectURL(
                          formData.modificationPhotos[index]
                        )}
                        alt={`Preview ${index + 1}`}
                        className="mt-2 w-32 h-32 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full bg-white rounded-lg shadow-sm p-6 col-span-full">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  General Compliance Checklist
                </h2>
                <p className="text-gray-600 mb-6">
                  The following points must be ensured to be complied with
                  before concreting:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="checklist-section">
                  <ChecklistTable items={leftTableItems} />
                </div>
                <div className="checklist-section">
                  <ChecklistTable items={rightTableItems} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Create Signature:
          </h2>

          {/* Signature Canvas */}

          <div className="signature-pad border-2 border-gray-300 rounded-lg overflow-hidden">
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              backgroundColor="white"
              canvasProps={{
                width: 500,
                height: 200,
                className: "signature-canvas",
              }}
            />
          </div>

          {/* Buttons for Saving/Clearing Signature */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              onClick={handleSaveSignature}
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save Signature
            </button>
            <button
              type="button"
              onClick={handleClearSignature}
              className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Clear
            </button>
          </div>

          {signatureImage && (
            <div className="mt-6 text-center ">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Signature Preview:
              </h3>
              <img
                src={signatureImage}
                alt="Signature Preview"
                className="w-38 h-32 border rounded-lg shadow-lg mx-auto p-5"
              />
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-200 rounded-b">
          <button
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Save all
          </button>
        </div>
        <style>{`
          .checklist-container {
            border: 1px solid #e5e7eb;
          }

          .checklist-item:not(:last-child) {
            margin-bottom: 1rem;
          }

          .parent-item {
            transition: all 0.2s ease-in-out;
          }

          .parent-item:hover {
            background-color: #f8fafc;
          }

          .nested-items {
            position: relative;
          }

          .nested-items::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 2px;
            background-color: #e5e7eb;
          }

          .nested-item {
            position: relative;
            transition: all 0.2s ease-in-out;
          }

          .nested-item:hover {
            background-color: #f8fafc;
          }

          .nested-item::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -2px;
            width: 12px;
            height: 2px;
            background-color: #e5e7eb;
          }
        `}</style>
      </div>
    </form>
  );
}

export default FormDesign;
