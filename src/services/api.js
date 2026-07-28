// Mock API Service simulating Axios requests with latency
import { companyDetails, corporateActionProduct, careersData } from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Get company core information
  getCompanyDetails: async () => {
    await delay(300);
    return {
      status: 200,
      data: companyDetails,
      statusText: "OK"
    };
  },

  // Get product detail page info
  getProductDetails: async (productId) => {
    await delay(400);
    if (productId === 'corporate-action') {
      return {
        status: 200,
        data: corporateActionProduct,
        statusText: "OK"
      };
    }
    return {
      status: 404,
      statusText: "Not Found",
      data: { message: "Product not found" }
    };
  },

  // Get active careers openings and perks
  getCareers: async () => {
    await delay(350);
    return {
      status: 200,
      data: careersData,
      statusText: "OK"
    };
  },

  // Submit contact message on Home Page
  submitContactForm: async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        return {
          status: response.status,
          data: { success: false, message: data.error || 'Failed to submit.' }
        };
      }
      return {
        status: 201,
        data: {
          success: true,
          message: data.message
        },
        statusText: "Created"
      };
    } catch (error) {
      console.error('Contact submission network error:', error);
      return {
        status: 500,
        data: { success: false, message: 'Local database server connection failed.' }
      };
    }
  },

  // Submit job application form on Careers Page
  submitJobApplication: async (applicationData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
      });
      const data = await response.json();
      if (!response.ok) {
        return {
          status: response.status,
          data: { success: false, message: data.error || 'Failed to submit.' }
        };
      }
      return {
        status: 201,
        data: {
          success: true,
          message: data.message
        },
        statusText: "Created"
      };
    } catch (error) {
      console.error('Careers submission network error:', error);
      return {
        status: 500,
        data: { success: false, message: 'Local database server connection failed.' }
      };
    }
  }
};
