import React from "react";
import * as Styles from "./styles";
import NavHeader from "../Header/NavHeader";
import { Col, Row } from "antd";
import Logo from "@/components/Logo";
import Currency from "../Header/RightHeader/Currency";
import Language from "../Header/RightHeader/Language";

import {
  FaCcAmex,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFacebookF,
  FaPinterestP,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <Styles.FooterWrapper>
      <Styles.FooterTopContainer>
        <Styles.FooterTop>
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12} xl={6}>
              <Styles.FooterContainer>
                <Logo src={"../footer-logo.png"} />
                <div>
                  <Currency color="white" />
                  <Language></Language>
                </div>
              </Styles.FooterContainer>
            </Col>
            <Col xs={24} md={12} xl={6}>
              <Styles.FooterContainer>
                <Styles.FooterTitle>Contact</Styles.FooterTitle>
                <Styles.FooterContent>
                  T: <span>1-634-567-34</span>
                </Styles.FooterContent>
                <Styles.FooterContent>
                  E: <span>contact@traveltourtheme.co</span>
                </Styles.FooterContent>
                <Styles.FooterSocialList>
                  <Styles.FooterSocialItem>
                    <a href="">
                      <FaFacebookF></FaFacebookF>
                    </a>
                  </Styles.FooterSocialItem>
                  <Styles.FooterSocialItem>
                    <a href="">
                      <FaTwitter></FaTwitter>
                    </a>
                  </Styles.FooterSocialItem>
                  <Styles.FooterSocialItem>
                    <a href="">
                      <FaPinterestP></FaPinterestP>
                    </a>
                  </Styles.FooterSocialItem>
                  <Styles.FooterSocialItem>
                    <a href="">
                      <FaTiktok></FaTiktok>
                    </a>
                  </Styles.FooterSocialItem>
                </Styles.FooterSocialList>
              </Styles.FooterContainer>
            </Col>
            <Col xs={24} md={12} xl={6}>
              <Styles.FooterContainer>
                <Styles.FooterTitle>Useful Links</Styles.FooterTitle>
                <Styles.FooterContentLink>
                  Travel Blog & Tips
                </Styles.FooterContentLink>
                <Styles.FooterContentLink>
                  Working With Us
                </Styles.FooterContentLink>
                <Styles.FooterContentLink>
                  Be Our Partner
                </Styles.FooterContentLink>
              </Styles.FooterContainer>
            </Col>
            <Col xs={24} md={12} xl={6}>
              <Styles.FooterTitle>Pay Safely With Us</Styles.FooterTitle>
              <Styles.FooterContent>
                The payment is encrypted and transmitted securely with an SSL
                protocol.
              </Styles.FooterContent>
              <Styles.FooterSocialList>
                <Styles.FooterSocialItem>
                  <FaCcVisa></FaCcVisa>
                </Styles.FooterSocialItem>
                <Styles.FooterSocialItem>
                  <FaCcPaypal></FaCcPaypal>
                </Styles.FooterSocialItem>
                <Styles.FooterSocialItem>
                  <FaCcMastercard></FaCcMastercard>
                </Styles.FooterSocialItem>
                <Styles.FooterSocialItem>
                  <FaCcAmex></FaCcAmex>
                </Styles.FooterSocialItem>
              </Styles.FooterSocialList>
            </Col>
          </Row>
        </Styles.FooterTop>
      </Styles.FooterTopContainer>
      <Styles.FooterBottomContainer>
        <Styles.FooterBottom>
          <NavHeader></NavHeader>
          <Styles.FooterBottomCopyright>
            Copyright © 2023 GoodLayers. All Rights Reserved.
          </Styles.FooterBottomCopyright>
        </Styles.FooterBottom>
      </Styles.FooterBottomContainer>
    </Styles.FooterWrapper>
  );
};

export default Footer;
