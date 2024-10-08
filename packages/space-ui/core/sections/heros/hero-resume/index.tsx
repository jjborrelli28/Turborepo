import { Document } from "@contentful/rich-text-types";
import { fadeAnimation } from "@space-ui/animations";
import { css, styled } from "@space-ui/config";
import {
  BackgroundColorBaseSectionProps,
  BaseSection,
  Button,
  ContainerProps,
  ImageProps,
  RichText,
} from "@space-ui/core";
import type * as Stitches from "@stitches/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useRef } from "react";
import { FaFileDownload } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { ContactFooter } from "./contact-footer";
import { ResumeColumn } from "./resume-column";

export const HeroResume = ({ section }: HeroResumeProps) => {
  const { ref, inView } = useInView({
    initialInView: true,
  });
  const resumeRef = useRef<HTMLDivElement | null>(null);
  const { locale } = useRouter();

  const {
    sectionName,
    size,
    backgroundColor,
    content,
    asset,
    presentation,
    firstColumn,
    secondColumn,
    customContentStyles,
  } = section.fields;

  const handleDownloadResume = async () => {
    if (typeof window === "undefined") return;

    if (resumeRef.current) {
      const element = resumeRef.current;

      const options = {
        margin: 0,
        filename: locale?.startsWith("es")
          ? "JuanJoseBorrelli-CV.pdf"
          : "JuanJoseBorrelli-Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      const html2pdf = (await import("html2pdf.js")).default;
      html2pdf().from(element).set(options).save();
    }
  };

  return (
    <BaseSection
      id={sectionName}
      size={size}
      backgroundColor={backgroundColor}
      css={{
        minh: "100vh",
        pt: "$headerMobile",
        "@bp2": {
          pt: "134px",
        },
      }}
    >
      <RichText
        ref={ref}
        content={content}
        className={fadeAnimation({
          type: inView ? "inLeft" : "out",
          time: 1000,
        })}
        css={customContentStyles}
      />
      <ResumeContainer>
        <Resume ref={resumeRef}>
          <ResumeContent>
            <RichText
              content={presentation}
              activeUnderlines
              className={css({
                color: "#000 !important",
                whiteSpace: "pre-wrap",
                gap: "7.5mm",
              }).toString()}
              blockClass={{
                "heading-2": clsx(
                  css({
                    fontSize: "$16 !important",
                    mb: "0 !important",
                    lineHeight: "initial !important",
                  }).toString()
                ),
                paragraph: css({
                  fontWeight: "$4",
                  fontSize: "$3 !important",
                  my: "0 !important",
                  lineHeight: "1.25 !important",
                }).toString(),
              }}
              markClass={{ bold: css({ color: "$fontSecondary" }).toString() }}
              renderers={{
                "heading-6": (_, children) => (
                  <p
                    className={css({
                      fontWeight: "$5",
                      fontSize: "$4 !important",
                      my: "0 !important",
                    }).toString()}
                  >
                    {children}
                  </p>
                ),
              }}
            />
            <img
              src={asset.fields.light.fields.file.url}
              className={css({
                position: "absolute",
                top: "7.5mm",
                right: "10mm ",
                maxw: "42mm ",
                borderRadius: "50%",
                b: "solid $fontSecondary 1mm",
                overflow: "hidden",
                backgroundColor: "$bgPrimary",
                radialGradient: "$bgGradientPrimary",
              }).toString()}
            />
            <ResumeColumns>
              <ResumeColumn
                content={firstColumn}
                css={{
                  pr: "7.5mm",
                  mb: "7.5mm",
                  br: "solid $fontSecondary 1mm",
                }}
              />
              <ResumeColumn
                content={secondColumn}
                css={{
                  pl: "7.5mm",
                  mb: "7.5mm",
                }}
              />
              <ContactFooter />
            </ResumeColumns>
          </ResumeContent>
        </Resume>

        <div
          className={css({
            display: "flex",
            justifyContent: "end",
            mb: "7.5mm",
          }).toString()}
        >
          <Button size="lg" onClick={handleDownloadResume}>
            {locale?.startsWith("es") ? "Descargar" : "Download"}&nbsp;
            <FaFileDownload />
          </Button>
        </div>
      </ResumeContainer>
    </BaseSection>
  );
};

export type HeroResumeProps = {
  section: {
    fields: {
      sectionName: string;
      size: ContainerProps;
      backgroundColor: BackgroundColorBaseSectionProps;
      content: Document;
      asset: ImageProps;
      presentation: Document;
      firstColumn: Document;
      secondColumn: Document;
      customContentStyles: Stitches.CSS;
    };
  };
};

const ResumeContainer = styled("div", {
  maxw: "210mm",
  display: "flex",
  flexDirection: "column",
  gap: "7.5mm",
  mt: "$11",
  mx: "auto",
  overflowX: "scroll",

  "@bp2": {
    overflowX: "visible",
  },
});

const Resume = styled("div", {
  h: "295mm",
  w: "210mm",
  backgroundColor: "#fff",
  display: "flex",
  p: "7.5mm",
  filter: "drop-shadow(0 20px 20px rgba(81, 29, 37, .5))",
  zIndex: 10,
});

const ResumeContent = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "7.5mm",
  b: "solid $fontSecondary 1mm",
  p: "7.5mm",
  position: "relative",
});

const ResumeColumns = styled("div", {
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(2,auto)",
  g: "15mm",
});
