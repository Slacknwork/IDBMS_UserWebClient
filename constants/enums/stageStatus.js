const stageStatusOptions = ["Unopen", "Ongoing", "Suspended", "Done"];

const stageStatusBackgroundChipColors = [
  "#EA526F",
  "#CAAD06",
  "#FE7133",
  "#82D173",
];

const stageStatusIndex = { Unopen: 0, Ongoing: 1, Suspended: 2, Done: 3 };

const stageStatusOptionsVietnamese = [
  "Chưa mở",
  "Đang hoạt động",
  "Tạm gián đoạn",
  "Hoàn thành",
];

export {
  stageStatusIndex,
  stageStatusOptionsVietnamese,
  stageStatusBackgroundChipColors,
};

export default stageStatusOptions;
