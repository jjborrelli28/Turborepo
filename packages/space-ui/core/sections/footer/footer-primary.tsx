import { Document } from "@contentful/rich-text-types";
import { css, styled } from "@space-ui/config";
import {
  BackgroundColorBaseSectionProps,
  Container,
  Icon,
  NavigationItemFieldsProps,
  RichText,
  TextLink,
} from "@space-ui/core";
import type * as Stitches from "@stitches/react";
import { useRouter } from "next/router";

export const FooterPrimary = ({ section }: FooterPrimaryProps) => {
  const { locale } = useRouter();

  const { backgroundColor, links, copyright, customCopyrightStyles } =
    section.fields;

  return (
    <Footer backgroundColor={backgroundColor}>
      <Container
        size="xl"
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.25rem",

          "@bp2": { gap: "0.5rem" },
        }}
      >
        <SocialNetworksContainer>
          {links.map((link, index) => {
            return (
              <TextLink
                key={index}
                href={link.fields.url}
                ariaLabel={`Personal's ${link.fields.reference}`}
              >
                <Icon type={link.fields.reference} />
              </TextLink>
            );
          })}
        </SocialNetworksContainer>
        <CopyrightContainer>
          <RichText
            content={copyright}
            blockClass={{
              paragraph: css({
                color: "$fontTertiary",
                my: "0 !important",
              }).toString(),
            }}
            css={customCopyrightStyles}
          />
          {new Date().getFullYear()}
        </CopyrightContainer>
        <div
          className={css({
            display: "flex",
            justifyContent: "end",
            w: "100%",
          }).toString()}
        >
          <p
            className={css({
              fontSize: "$4",
              mt: "2.5rem",
              mb: "0",

              "@bp2": { fontSize: "$6" },
            }).toString()}
          >
            {locale === "es" ? "Hecho con amor" : "Made with love"} ❤️
          </p>
        </div>
      </Container>
    </Footer>
  );
};

const SocialNetworksContainer = styled("div", {
  display: "flex",
  gap: "1.15rem",

  "@bp2": {
    gap: "1.5rem",
  },

  a: {
    color: "$fontTertiary",
    textDecoration: "none",
    transition: "all 0.3s",
    fontSize: "$14",
  },
});

const CopyrightContainer = styled("div", { display: "flex", "*": { m: "0" } });

const Footer = styled("footer", {
  py: "5rem",
  px: "$5",
  color: "$fontTertiary",
  fontSize: "$4",

  "@bp2": { fontSize: "$8" },

  variants: {
    backgroundColor: {
      primary: {
        backgroundColor: "$bgSectionPrimary",
      },
      secondary: {
        backgroundColor: "$bgSectionSecondary",
      },
    },
  },
});

export type FooterPrimaryProps = {
  section: {
    fields: {
      backgroundColor: BackgroundColorBaseSectionProps;
      links: NavigationItemFieldsProps[];
      copyright: Document;
      customCopyrightStyles: Stitches.CSS;
    };
  };
};
