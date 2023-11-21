export default {
  id: {
    NAVBAR: "#navbar",
    BOOKING_SECTION: "#booking-section",
    PROJECT_SECTION: "#project-section",
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
      site: {
        getUri: (id) => `/project/${id}/site#project-section`,
        siteNo: {
          getUri: (id, siteId) =>
            `/project/${id}/site/${siteId}#project-section`,
          floor: {
            getUri: (id, siteId) =>
              `/project/${id}/site/${siteId}/floor#project-section`,
            floorNo: {
              getUri: (id, siteId, floorId) =>
                `/project/${id}/site/${siteId}/floor/${floorId}#project-section`,
              room: {
                getUri: (id, siteId, floorId) =>
                  `/project/${id}/site/${siteId}/floor/${floorId}/room#project-section`,
                roomNo: {
                  getUri: (id, siteId, floorId, roomId) =>
                    `/project/${id}/site/${siteId}/floor/${floorId}/room/${roomId}#project-section`,
                },
              },
            },
          },
        },
      },
      tasks: {
        taskId: {
          getUri: (id, taskId) =>
            `/project/${id}/tasks/${taskId}#project-section`,
          reports: {
            getUri: (id, taskId) =>
              `/project/${id}/tasks/${taskId}/reports#project-section`,
          },
        },
      },
    },
  },
};
