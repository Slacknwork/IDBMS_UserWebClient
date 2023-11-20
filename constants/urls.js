export default {
  id: {
    NAVBAR: "#navbar",
    BOOKING_SECTION: "#booking-section",
  },
  project: {
    getUri: () => `/project`,
    booking: {
      getUri: () => `/project/booking`,
      decor: {
        getUri: () => `/project/booking/decor#booking-section`,
        site: {
          getUri: () => `/project/booking/decor/site#booking-section`,
          siteNo: {
            getUri: (siteNo) =>
              `/project/booking/decor/site/${siteNo}#booking-section`,
            floor: {
              getUri: (siteNo) =>
                `/project/booking/decor/site/${siteNo}/floor#booking-section`,
              floorNo: {
                getUri: (siteNo, floorNo) =>
                  `/project/booking/decor/site/${siteNo}/floor/${floorNo}#booking-section`,
                room: {
                  getUri: (siteNo, floorNo) =>
                    `/project/booking/decor/site/${siteNo}/floor/${floorNo}/room#booking-section`,
                  roomNo: {
                    getUri: (siteNo, floorNo, roomNo) =>
                      `/project/booking/decor/site/${siteNo}/floor/${floorNo}/room/${roomNo}#booking-section`,
                  },
                },
              },
            },
          },
        },
        submit: {
          getUri: () => `/project/booking/decor/submit#booking-section`,
        },
      },
    },
    id: {
      getUri: (id) => `/project/${id}`,
    },
  },
};
