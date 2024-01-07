import { Link } from "/navigation";
import { useTranslations } from "next-intl";

const PageTitle = (props) => {
  const t = useTranslations("Header");

  return (
    <section className="wpo-page-title">
      <div className="container">
        <div className="row">
          <div className="col col-xs-12">
            <div className="wpo-breadcumb-wrap">
              <h2>{props.pageTitle}</h2>
              <ol className="wpo-breadcumb-wrap">
                <li>
                  <Link href="/">{t("Home")}</Link>
                </li>
                <li>
                  <span>{props.pagesub}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
