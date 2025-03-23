# **Trip Planner Frontend**

This is the frontend application for the **Trip Planner** project. It allows users to plan trips by submitting trip details and view the results, including route data and ELD (Electronic Logging Device) logs. The application is built with **React** and styled using **Material-UI**.

---

## **Features**

### **2. Home Page**
- Users can input the following trip details:
  - **Current Location**
  - **Pickup Location**
  - **Dropoff Location**
  - **Cycle Hours Used**
- Submits the trip details to the backend API hosted at `https://eld-log-generator.onrender.com/api/trips/`.
- Implements retry logic for network timeouts (up to 3 retries).
- Displays error messages for failed submissions.

### **3. Results Page**
- Displays the calculated route and ELD logs for a specific trip.
- Fetches trip data from the backend API at `https://eld-log-generator.onrender.com/api/trips/{tripId}/calculate_route/`.
- Features:
  - **Route Map**: Displays the route on a map (if available).
  - **ELD Logs Table**: Displays the ELD logs in a tabular format.
  - **Download PDF**: Allows users to download the ELD logs as a PDF.
- Handles network errors and provides a retry option.

---

## **Getting Started**

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/itmakai/trip-planner-frontend.git
   cd trip-planner-frontend