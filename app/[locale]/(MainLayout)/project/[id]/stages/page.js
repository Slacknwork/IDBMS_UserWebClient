"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Chip, CircularProgress, Stack } from "@mui/material";
import { toast } from "react-toastify";
import moment from "moment-timezone";

import stageStatusOptions, {
  stageStatusBackgroundChipColors,
} from "/constants/enums/stageStatus";

import { getPaymentStagesByProjectId } from "/services/paymentStageServices";

import Pagination from "/components/Shared/Pagination";
import Search from "/components/Shared/Search";
import NavButton from "/components/Shared/NavButton";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

export default function PaymentStagesPage() {
  // CONSTANTS
  const pageQuery = "page";
  const defaultPage = 1;
  const defaultPageSize = 5;

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [stages, setStages] = useState([]);
  const [count, setCount] = useState(0);

  const fetchStages = async () => {
    try {
      const page = searchParams.get(pageQuery) ?? 1;
      const pageSize = defaultPageSize;

      const stages = await getPaymentStagesByProjectId({
        projectId: params.id,
        page,
        pageSize,
      });
      setCount(stages.totalPage);
      setStages(stages.list);
    } catch (error) {
      toast.error("Error: Stages");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchStages()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-12 col-12">
          <NavButton url={`/project/${params.id}`} label="Overview"></NavButton>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <div className="d-flex justify-content-between">
            <h3 className="my-auto">Stages</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <Search placeholder="Search Stages"></Search>
        </div>
        <div className="col col-lg-12 col-12" style={{ minHeight: "25rem" }}>
          {loading ? (
            <Stack sx={{ height: "100%" }}>
              <CircularProgress
                sx={{ m: "auto", color: "#CAAD06" }}
                size="3rem"
              ></CircularProgress>
            </Stack>
          ) : (
            <table className="table table-striped table-hover">
              <thead
                className="shadow-sm"
                style={{ position: "sticky", top: 0, zIndex: 1 }}
              >
                <tr>
                  <th scope="col" width="5%" style={{ textAlign: "center" }}>
                    No.
                  </th>
                  <th scope="col" width="25%">
                    Name
                  </th>
                  <th scope="col" width="15%">
                    Contract Total (VND)
                  </th>
                  <th scope="col" width="15%">
                    Incurred Total (VND)
                  </th>
                  <th scope="col" width="15%" style={{ textAlign: "center" }}>
                    Work time
                  </th>
                  <th scope="col" width="15%">
                    Payment deadline
                  </th>
                  <th scope="col" width="15%">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {stages &&
                  stages.length > 0 &&
                  stages.map((stage) => (
                    <tr key={stage.id}>
                      <th
                        scope="row"
                        className="align-middle"
                        style={{ textAlign: "center" }}
                      >
                        {stage && stage.stageNo}
                      </th>
                      <td className="align-middle">
                        {stage && stage.name}
                        <br />
                        <span style={{ fontSize: 14 }}>
                          {stage?.isWarrantyStage
                            ? "(Giai đoạn bảo hành)"
                            : null}
                        </span>
                      </td>
                      <td className="align-middle">
                        <span>
                          {stage?.totalContractPaid?.toLocaleString("en-US") ??
                            0}
                          <br />~ {stage?.pricePercentage ?? 0} %
                          <br />
                          <span style={{ fontWeight: 800 }}>
                            {stage?.isContractAmountPaid
                              ? "(Đã trả)"
                              : "(Chưa trả)"}
                          </span>
                        </span>
                      </td>
                      <td className="align-middle">
                        <span>
                          {stage?.totalIncurredPaid?.toLocaleString("en-US") ??
                            0}
                          <br />
                          <span style={{ fontSize: 14 }}>
                            {stage?.penaltyFee > 0
                              ? "+ " +
                                (stage?.penaltyFee?.toLocaleString("en-US") ??
                                  0)
                              : null}
                          </span>
                          <br />
                          {stage?.isIncurredAmountPaid
                            ? "(Đã trả)"
                            : stage?.isContractAmountPaid
                            ? "(Chưa trả)"
                            : null}
                        </span>
                      </td>
                      <td className="align-middle">
                        <p style={{ textAlign: "center", margin: 0 }}>
                          {stage.startedDate
                            ? `${new Date(stage.startedDate).toLocaleDateString(
                                "vi-VN"
                              )}`
                            : "N/A"}
                        </p>
                        <p style={{ textAlign: "center", margin: 0 }}>-</p>
                        <p style={{ textAlign: "center", margin: 0 }}>
                          {stage.endDate
                            ? `${new Date(stage.endDate).toLocaleDateString(
                                "vi-VN"
                              )}`
                            : "N/A"}
                        </p>
                      </td>
                      <td className="align-middle">
                        {stage.endTimePayment
                          ? moment(stage.endTimePayment).format("L")
                          : "Chưa xác định"}
                      </td>
                      <td className="align-middle">
                        <Chip
                          sx={{
                            px: "4px",
                            backgroundColor:
                              stageStatusBackgroundChipColors[stage?.status] ||
                              "error",
                            "& .MuiChip-label": {
                              pt: "1px",
                              fontSize: 14,
                              fontWeight: 600,
                              color: "white",
                            },
                          }}
                          size="small"
                          label={
                            stageStatusOptions[stage?.status] ||
                            "Không xác định"
                          }
                        ></Chip>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="col col-12 col-lg-12">
          <Pagination count={count}></Pagination>
        </div>
      </div>
    </div>
  );
}
