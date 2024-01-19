"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "/navigation";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchParticipationRoleData } from "/store/reducers/customerData";
import PageTitle from "/components/PageTitle";
import Tabs from "/components/Tabs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { participationRoleIndex } from "/constants/enums/participationRole";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const params = useParams();
  const data = useSelector((state) => state.customerData);
  const user = useSelector((state) => state.customer);
  const participationRole = data?.participationRole;
  const dispatch = useDispatch();
  const t = useTranslations("ProjectDetails_Overview");
  const tab = useTranslations("ProjectDetails_Tab");
  const h = useTranslations("Header");

  const tabs = [
    {
      path: "",
      label: tab("Overview"),
    },
    {
      path: "floors",
      label: tab("Floors"),
    },
    {
      path: "stages",
      label: tab("Stages"),
    },
    {
      path: "tasks",
      label: tab("Tasks"),
    },
    {
      path: "comments",
      label: tab("Comments"),
    },
    {
      path: "items",
      label: tab("Items"),
    },
    {
      path: "documents",
      label: tab("Documents"),
    },
    {
      path: "participations",
      label: tab("Participations"),
    },
    {
      path: "transactions",
      label: tab("Transactions"),
    },
    {
      path: "warranty-claims",
      label: tab("WarrantyClaims"),
    },
  ];

  const viewerTabs = [
    {
      path: "",
      label: tab("Overview"),
    },
    {
      path: "floors",
      label: tab("Floors"),
    },
    {
      path: "stages",
      label: tab("Stages"),
    },
    {
      path: "tasks",
      label: tab("Tasks"),
    },
    {
      path: "comments",
      label: tab("Comments"),
    },
    {
      path: "items",
      label: tab("Items"),
    },
  ];

  useEffect(() => {
    try {
      const userId = user?.id;
      const projectId = params.id;
      dispatch(fetchParticipationRoleData({ userId, projectId }));
    } catch (error) {
      toast.error("Lỗi dữ liệu: Quyền truy cập!");
    }
  }, []);

  const [isViewer, setIsViewer] = useState(true);
  useEffect(() => {
    setIsViewer(
      participationRole?.role &&
        participationRole?.role === participationRoleIndex.Viewer
    );
  }, [participationRole]);

  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <PageTitle pageTitle={t("Details")} pagesub={h("Projects")} />
      <section id="project-section" className="mt-4">
        <div className="container wpo-shop-single-section">
          <div className="row">
            <div className="col-12 product-info p-0">
              <Tabs uriPos={3} tabs={isViewer ? viewerTabs : tabs}></Tabs>
            </div>
            <div
              className="shadow-lg py-3 mb-4"
              style={{ backgroundColor: "white", minHeight: "30rem" }}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
