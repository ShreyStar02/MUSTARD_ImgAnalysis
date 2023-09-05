import React, { useState } from "react";
import {
    Dropdown,
    DropdownButton,
    Button,
    ButtonGroup,
    Image,
    Form,
} from "react-bootstrap";
import "./ImgAnalyze.css";

const ImgAnalyze = () => {
    const [image, setImage] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [responses, setResponses] = useState([]);
    const [responseCounter, setResponseCounter] = useState(0);
    const [allFiltersSelected, setAllFiltersSelected] = useState(false);

    const handleImageUpload = (event) => {
        const uploadedImage = event.target.files[0];
        setImage(URL.createObjectURL(uploadedImage));
        setSelectedFilters([]);
        setResponses([]);
        setResponseCounter(0);
        setAllFiltersSelected(false);
    };

    const handleFilterClick = (filter) => {
        if (!allFiltersSelected) {
            const newFilters = [...selectedFilters, filter];
            setSelectedFilters(newFilters);
            applyFilter(newFilters);
        }
    };

    const applyFilter = (filters) => {
        // Simulate the backend response as the same request for testing
        // Replace this with your actual filter logic when the backend is ready
        const newResponse = `sample_${filters.join("_")}.png`;
        setResponses([...responses, newResponse]);
        if (responseCounter === 3) {
            setAllFiltersSelected(true);
        }
        setResponseCounter(responseCounter + 1);
    };

    const handleMagicClick = () => {
        setSelectedFilters(["Magic"]);
        handleFilterClick("Magic");
        applyMagic();
    };

    const applyMagic = () => {
        // Simulate the backend response as the same request for testing
        // Replace this with your actual magic filter logic when the backend is ready
        const newResponse = "sample_magic.png";
        setResponses([...responses, newResponse]);
        setResponseCounter(responseCounter + 1);
    };

    const handleResetClick = () => {
        setSelectedFilters([]);
        setResponses([]);
        setResponseCounter(0);
        setAllFiltersSelected(false);
    };

    return (
        <div>
            {image ? (
                <div className="custom-image-frame">
                    <Image
                        src={image}
                        alt="Uploaded"
                        className="custom-image"
                    />
                </div>
            ) : (
                <Form.Control
                    type="file"
                    size="lg"
                    accept="image/*"
                    onChange={handleImageUpload}
                    data-bs-theme="dark"
                />
            )}
            {responses.map((response, index) => (
                <div key={index} className="custom-image-frame">
                    <Image
                        src={response}
                        alt={`Filtered ${index + 1}`}
                        className="custom-image"
                    />
                </div>
            ))}
            {image && (
                <div className="button-row">
                    <ButtonGroup>
                        {selectedFilters.map((filter) => (
                            <Button key={filter} variant="secondary" disabled>
                                {filter}
                            </Button>
                        ))}
                    </ButtonGroup>
                    <br />
                    <center>
                        <tr>
                            <td>
                                {allFiltersSelected ||
                                (selectedFilters.includes("Filter1") &&
                                    selectedFilters.includes("Filter2") &&
                                    selectedFilters.includes("Filter3")) ||
                                selectedFilters.includes("Magic") ? null : (
                                    <DropdownButton
                                        title="Filters"
                                        data-bs-theme="dark"
                                    >
                                        {selectedFilters.includes(
                                            "Filter1"
                                        ) ? null : (
                                            <Dropdown.Item
                                                onClick={() =>
                                                    handleFilterClick("Filter1")
                                                }
                                            >
                                                Filter1
                                            </Dropdown.Item>
                                        )}
                                        {selectedFilters.includes(
                                            "Filter2"
                                        ) ? null : (
                                            <Dropdown.Item
                                                onClick={() =>
                                                    handleFilterClick("Filter2")
                                                }
                                            >
                                                Filter2
                                            </Dropdown.Item>
                                        )}
                                        {selectedFilters.includes(
                                            "Filter3"
                                        ) ? null : (
                                            <Dropdown.Item
                                                onClick={() =>
                                                    handleFilterClick("Filter3")
                                                }
                                            >
                                                Filter3
                                            </Dropdown.Item>
                                        )}
                                    </DropdownButton>
                                )}
                            </td>
                            <td>
                                {selectedFilters.includes("Magic") ? null : (
                                    <Button
                                        variant="primary"
                                        onClick={handleMagicClick}
                                    >
                                        Magic
                                    </Button>
                                )}
                            </td>
                        </tr>
                    </center>
                    <div>
                        <Button variant="danger" onClick={handleResetClick}>
                            Reset
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImgAnalyze;
