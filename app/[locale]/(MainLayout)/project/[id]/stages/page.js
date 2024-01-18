"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Chip, CircularProgress, Stack } from "@mui/material";
import { toast } from "react-toastify";
import moment from "moment-timezone";

import stageStatusOptions, {
  stageStatusBackgroundChipColors,
  stageStatusOptionsEnglish,
} from "/constants/enums/stageStatus";

import { getPaymentStagesByProjectId } from "/services/paymentStageServices";

import Pagination from "/components/Shared/Pagination";
import Search from "/components/Shared/Search";
import NavButton from "/components/Shared/NavButton";
import { useTranslations } from "next-intl";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

export default function PaymentStagesPage() {
  // CONSTANTS
  const pageQuery = "page";
  const defaultPage = 1;
  const defaultPageSize = 5;

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();
  const language = params?.locale === "en-US" ? "english" : params?.locale === "vi-VN" ? "vietnamese" : "";

  // FETCH DATA
  const [loading, setLoading] = useState(true);
  const [stages, setStages] = useState([]);
  const [count, setCount] = useState(0);
  const t = useTranslations("ProjectDetails_Stage");
  const o = useTranslations("ProjectDetails_Overview");
  const e = useTranslations("Error");

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
      toast.error(e("StagesError"));
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
          <NavButton url={`/project/${params.id}`} label={o("Overview")}></NavButton>
        </div>
        <div className="col col-lg-12 col-12 mb-4">
          <div className="d-flex justify-content-between">
            <h3 className="my-auto">{t("Stages")}</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <Search placeholder={t("SearchStages")}></Search>
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
                  {t("No")}.
                  </th>
                  <th scope="col" width="25%">
                  {t("Name")}
                  </th>
                  <th scope="col" width="15%">
                  {t("ContractTotal")} (VND)
                  </th>
                  <th scope="col" width="15%">
                  {t("IncurredTotal")} (VND)
                  </th>
                  <th scope="col" width="15%" style={{ textAlign: "center" }}>
                  {t("WorkTime")}
                  </th>
                  <th scope="col" width="15%">
                  {t("PaymentDeadline")}
                  </th>
                  <th scope="col" width="15%">
                  {t("Status")}
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
                            ? `(${t("WarrantyPeriod")})`
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
                              ? `(${t("Paid")})`
                              : `(${t("Unpaid")})`}
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
                            ? `(${t("Paid")})`
                            : stage?.isContractAmountPaid
                            ? `(${t("Unpaid")})`
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
                          : t("Undefined")}
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
                          label=
                          {
                            (() => {
                              if (language === "english") {
                                return stageStatusOptionsEnglish[
                                    stage?.status
                                  ]
                                ;
                              } else if (language === "vietnamese") {
                                return stageStatusOptions[
                                    stage?.status
                                  ]
                              } else {
                                return t("Unknown");
                              }
                            })()
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
