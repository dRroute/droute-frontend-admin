import axios from "axios";

export const apiPutRequest = async (request) => {
    
        const headers = {
            "accept": "*/*",
            "content-type": request.content_type,
            Authorization: `Bearer ${request.accessToken}`, // Add Bearer token here

        };
        console.log("request in apiPatchRequest", JSON.stringify(request, null, 2));

        const response = await axios.put(request.apiUrl, request.data, { headers });
        console.log("response in apiPatchRequest", response.data);
        return response;
    
};
