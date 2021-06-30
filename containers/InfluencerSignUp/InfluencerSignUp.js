import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import styles from "./InfluencerSignUpStyle";
import { Grid } from "@material-ui/core";
import Recaptcha from "react-recaptcha";
import IconCard from "components/Cards/IconCard.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/ButtonInf.jsx";
import Hidden from "@material-ui/core/Hidden";
import Checkbox from "@material-ui/core/Checkbox";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import LoadingScreen from "components/LoadingScreen";
import AlertModalDialog from "components/AlertModalDialog";
import ModalDialog from 'components/ModalDialog';
import PerfectScrollbar from "perfect-scrollbar";
import { connect } from "react-redux";
import {
  changeName,
  changeErrorMessage,
  changeEmail,
  changePhone,
  changePassword,
  changePasswordConfirm,
  changePasswordConfirmState,
  changePasswordState,
  createUser,
  clearState,
  verifySignUp,
  changeCaptcha,
  checkTermsConditions,
  stoppingSignUp,
  submitLogin,
  dispatchNotification,
  closeNotification
} from "reducers/SignUpReducer";
import withStyles from "@material-ui/core/styles/withStyles";

import {
  LOGO,
  LAYOUT_LOGIN_BACKGROUND_IMAGE,
  APP_NAME
} from "constants/common";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      openRecommendModal: false,
      openTermsConditionsDialog: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.ps = null;
    props.clearState();
  }
  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  componentDidMount() {
    this.ps = new PerfectScrollbar(this.refs.main, {
      suppressScrollX: true,
      suppressScrollY: false,
      wheelPropagation: false
    });
    const email = this.props.history.location.search
      ? this.props.history.location.search
          .split("?")[1]
          .split("&")
          .map(element => {
            const subElenment = element.split("=");
            if (subElenment[0] === "email") {
              return subElenment[1];
            }
            return "";
          })
      : "";
    if (email) {
      this.props.changeEmail(email[0]);
    }
    this.updateWindowDimensions();
    window.addEventListener(
      "resize",
      _.throttle(() => {
        this.updateWindowDimensions();
      }, 300)
    );
  }
  componentWillUnmount() {
    this.ps.destroy();
    this.ps = null;
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  openRecommendModal = () => {
    this.setState({
      openRecommendModal: true
    });
  };
  closeRecommendModal = () => {
    this.setState(
      {
        openRecommendModal: false
      },
      () => {
        this.props.submitLogin(this.props.email, this.props.password);
      }
    );
  };
  openTermsConditionsModal = () => {
    this.setState({
      openTermsConditionsDialog: true
    });
  };
  closeTermsConditionsModal = () => {
    this.setState({
      openTermsConditionsDialog: false
    });
  };

  render() {
    const {
      classes,
      email,
      emailState,
      password,
      passwordState,
      isSigningUp,
      errorMessage,
      passwordConfirmState,
      name,
      isVerifiedSignUp,
      nameState,
      phone,
      phoneState,
      captcha,
      captchaState,
      isCheckedTermsConditions,
      place,
      color,
      icon,
      message,
      open,
      closeNotification
    } = this.props;
    return (
      <div
        ref="main"
        className={classes.mainDiv}
        style={{
          backgroundImage: `url(${LAYOUT_LOGIN_BACKGROUND_IMAGE}`,
          height: "100vh",
          width: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          zIndex: "-1",
          position: "fixed",
          overflow: "auto"
        }}
      >
        <ModalDialog
          keepMounted
          open={this.state.openTermsConditionsDialog}
          onClose={this.closeTermsConditionsModal}
          onCloseClick={this.closeTermsConditionsModal}
          onClickButton={() => {
            this.props.checkTermsConditions(true)
            this.closeTermsConditionsModal()
          }}
          modalTitle={"SociaLift Terms & Conditions"}
          buttonText={"Agree"}
          modalContent={
            <div className={classes.termsConditionsContainer}>
              <h4>SociaLift Terms and Conditions</h4>

              <p>SociaLift’s following <a href="https://developers.google.com/youtube/terms/developer-policies#a.-api-client-terms-of-use-and-privacy-policies" target="_blank">YouTube Terms of Service (ToS)</a> &amp; <a href="https://developers.google.com/assistant/console/policies/privacy-policy-guide" target="_blank">Google Privacy</a> policy.</p>
            
              <p>Our Application is using YouTube API services to collect public data to help you analyze performance of the channel.</p>

              <br/>
              
              <p>SociaLift and the client specified in the attached Term Sheet (“Client”) believe in following industry best practices, including full, fair and effective disclosures of material facts relating to your relationship with Client in accordance with the Federal Trade Commission’s Guides Concerning Endorsements and Testimonials in Advertising (“FTC Guides”). As such, we require that all bloggers, influencers and similar persons (“Influencer” or “You”) adhere to the guidelines set forth below (the “Guidelines”) and in SociaLift’s Influencer Terms and Conditions (the “Terms”) when blogging, tweeting or otherwise publishing content about Client or Client’s products or services. </p>

              <p><strong>Respect Intellectual Property Rights – </strong>Intellectual Property is the group of legal rights to works that people create or invent. Intellectual property rights typically include copyright, trademark, and trade secret rights, as well as the right to use someone’s name, likeness, image, or voice. Examples include photographs, videos, music (including song lyrics), trademarks/logos (e.g. Nike), brand names or brand packaging (e.g. Coca-Cola, McDonald’s), personal names/likenesses (including celebrities’ names/likenesses), quotes and writings. You should never post or share any content including these elements without obtaining written permission to do so from the third party who owns the rights, as this would constitute a violation or infringement of their intellectual property.</p>

              <h5>This Means:</h5>
              <p><strong>a.</strong> You should not post or share any works that You do not own or have a proper license to use or have not been authorized by Client for usage.</p>
              <p><strong>b.</strong> You should get permission from any third parties featured in photos and other content that You post – for example, a signed release, waiver, or other form of written permission from those third parties – even if You took the photo yourself, know the individuals involved and/or obtained verbal consent.</p>
              <p><strong>c.</strong> If You are unsure about a work, particularly in instances where a work includes a third-party’s trademark/logo (e.g. a Coke can or Louis Vuitton bag), or music, film or television clips, or a celebrity’s name, photo or image, You should check with Client before using the work. A good rule of thumb is, if in doubt, do not post it.</p>

              <p><strong>Disclose Your Connection to Client –</strong> As set forth in the Terms, when blogging or posted about Client or Client’s products or services, You must clearly disclose your “material connections” with Client, (i.e. the fact that your post is “sponsored by Client”) and include any hashtags requested by SociaLift or Client (such as #ad or #sponsored). “Material connections” may be defined as any connection between an Influencer and a marketer that could affect the credibility consumers give to that Influencer’s statements. Important examples of “material connections” include consideration (i.e., benefits or incentives such as monetary compensation, loaner products, free products or services, in-kind gifts, or special access privileges) provided by a marketer to a You. Note that while SociaLift and/or Client may provide recommendations and options for disclosures, neither SociaLift nor Client will be responsible for any failure by You to comply with the FTC Guides or any failure by You to obtain all third party clearances and permissions with respect to content You post.</p>

              <p><strong>Maintain Clear and Prominent Disclosure –</strong> The above disclosure should be made in close proximity to any statements that You make about Client or Client’s products. This disclosure should be clear and prominent enough for consumers to view it when they are reading your posts. This means that the disclosure should not be buried behind links or in terms and conditions (or in similar documents). In addition, the consumer should not be required to click on, scroll down or mouse over a link in order to view the disclosure. Please note that this disclosure is required regardless of any space limitations of the medium (e.g., Twitter), where the disclosure can be made via hashtags, such as #sponsored, #paid or #ad (preferably at the beginning of the tweet).</p>

              <p><strong>Give Your Honest and Truthful Opinions –</strong> Your statements should always reflect your honest and truthful opinions and actual experiences. If a statement is not your opinion, but rather something that Client has asked You to say, this fact should be made clear to readers.</p>

              <p><strong>Only Make Factual Statements That Are Truthful and Can Be Verified –</strong> Only make a factual statement about Client or Client’s product/service’s characteristics or quality which You know for certain is true and can be verified. For example, do not make statements about the performance of a product unless You have support for such claims. Remember that even if You do not expressly state a fact, it may be implied, and these Guidelines apply to both express and implied messages.</p>

              <p><strong>Do Not Send E-mail Messages on Client’s Behalf Unless Expressly Requested To Do So –</strong> Unless expressly requested to do so by Client, You are not permitted to send any e-mails on Client’s behalf, nor will Client provide You any compensation if You send any emails on its behalf.</p>

              <p><strong>Comply with other policies and laws –</strong> You should comply with the terms, conditions, guidelines and policies of any service that You use and all applicable laws. For instance, if a service says it may not be used for commercial purposes, then You should not promote Client or Client’s products or services on such a site.</p>

              <p><strong>Protect Your Personal Information –</strong> Protect your privacy by keeping in mind that your posts are public. Don’t share personal or sensitive information about You or your family that You may not want to make available to the public.</p>

              <p><strong>Respect Others’ Privacy –</strong> Do not include personal information about any third party that has not been voluntarily made available by them for You to share in your posts. This includes any information that may make it possible for someone to reasonably identify another person.</p>

              <p><strong>These Influencer Terms and Conditions</strong> (the <strong>“Terms”</strong>) are entered into by and between SociaLift, Inc. (<strong>“SociaLift”</strong>), on behalf of its client named on the term sheet (<strong>“Term Sheet”</strong>) signed by the parties (<strong>“Client”</strong>), and the individual specified in the applicable Term Sheet executed by the parties (“Influencer”), with regard to Influencer’s performance of spokesperson, influencer, public relations, and social media services for Client effective as of the date of the Term Sheet (the <strong>“Effective Date”</strong>).</p>

              <h5>1) Engagement</h5>
              <p>In exchange for certain compensation, products and/or experiences, and other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, SociaLift engages Influencer to perform, and Influencer agrees to perform, the services specified on one or more Term Sheets entered into by Influencer and SociaLift (the “Services”) for the fees and compensation set forth in the Term Sheet. Except as otherwise expressly provided herein, Influencer will perform the Services at its own expense and using its own resources and equipment.</p>

              <h5>2) Intellectual Property Rights</h5>
              <p><strong>(a) Work Product.</strong> Influencer shall perform the Services and develop any work product hereunder for SociaLift as a “work made for hire” according to U.S. Copyright law, and such work product, including all copyrights, trademarks and other intellectual property rights embodied therein (collectively, the “Work Product”) shall be owned exclusively by SociaLift. In the event any portion of the Work Product is not considered “work made for hire” or as otherwise necessary to ensure full ownership of the Work Product by SociaLift, Influencer hereby assigns to SociaLift all right, title, and interest in and to such Work Product. Influencer will sign any additional documents that may be reasonably necessary to effect such assignment.</p>

              <p><strong>(b) Intellectual Property Rights.</strong> No license or other right of any kind is granted by SociaLift or Client to Influencer, except as expressly provided in these Terms. Influencer shall not use SociaLift’s or Client’s copyrights, trademarks, trade names, or other intellectual property in any way except to the limited extent as may be expressly agreed in the Term Sheet.</p>

              <p><strong>(c) Influencer’s Content and Attributes.</strong> For the Services which Influencer is providing under these Terms and without limiting SociaLift’s ownership of the Work Product as specified above, Influencer gives SociaLift and Client the irrevocable, sublicenseable, worldwide right and permission to use any Work Product or other video, photo, written or verbal content Influencer shares or provides related to the Services (collectively, “Client-Related Content”) in any manner, in whole or in part, and for any purpose in any and in any and all media, including and without limitation, on SociaLift and/or Client owned or controlled websites and platforms, social media, any advertising materials, publications, marketing materials, and/or presentations, and in any and all other media, in perpetuity. Any statements, posts and/or feedback that Influencer provides may be paraphrased, amplified, shortened and/or put into conversational form. Influencer further agrees that SociaLift and/or Client may contact (including by means of messages on public social media platforms)</p>

              <p>Influencer about any Client-Related Content.  Influencer acknowledges that participation in the Services means SociaLift and Client can use Influencer’s Client-Related Content and include Influencer’s name/likeness/social media handle or channel/blog name and any other Influencer attributes in any manner that SociaLift and/or Client determine supports the purposes of these Terms, including use in any media that accepts advertising or promotional content or communications (such as, but not limited to, digital, print, television or radio).</p>

              <p>Influencer agrees that Influencer will not hold SociaLift or Client, or their respective licensees, responsible for any liability resulting from their use of Influencer’s Client-Related Content in accordance with the terms hereof. SociaLift and Client shall not be liable for any indirect, consequential, exemplary damages (including but not limited to lost profits) and the combined, aggregate liability of SociaLift and Client hereunder shall not exceed the fees payable to Influencer under the Term Sheet.</p>

              <h5>3) Representations and Warranties; Indemnity.</h5>
              <p><strong>(a) Influencer represents and warrants that:</strong> (i) Influencer has the right to assign the Work Product to SociaLift as set forth in Section 2; (ii) the Work Product and other Client-Related Content will be original and will not infringe upon any copyright, patent, trademark, right of publicity or privacy, or any other proprietary or other right of any person, whether contractual, statutory or common law; (iii) the Services rendered by Influencer shall be promptly rendered with due care and shall be of first rate quality; (iv) Influencer shall not, during the term of these Terms, render any services of any kind directly or indirectly for any company competitive with SociaLift or Client or conduct or participate in any program, promotion or other project that would detract from the Services Influencer is providing hereunder; (v) Influencer will not commit any act which brings SociaLift or Client into public disrepute, contempt, scandal, or ridicule, or which insults or offends the general community to which SociaLift’s advertising materials are directed, or which might tend to harm SociaLift or any of SociaLift’s or Client’s products or services including, without limitation, disparaging SociaLift, Client, their products or services, or their competitors; (vi) Influencer’s statements, posts and feedback are true and accurately reflect Influencer’s honest opinion and experience with SociaLift, Client, and their competitors’ products and/or services to the extent applicable, (vii) Influencer agrees that time is of the essence in connection with these Terms and all deadlines provided by SociaLift, and (vii) Influencer will comply with all applicable federal, state and local laws, regulations, administrative guidelines, orders and ordinances, including without limitation, all privacy and data security laws and the terms and conditions of all applicable third party web sites, platforms or applications, including by making disclosures in accordance with the FTC Guides as further detailed in 3(b) below, in rendering the Services herein.</p>

              <p>Further, SociaLift and its licensors retain all ownership rights in their proprietary platforms, software, websites and technology, including any updates, enhancements, modifications thereto or any back-end technology associated therewith (“SociaLift Platforms”). Influencer agrees not to: (i) copy, rent, lease, sell, distribute, or create derivative works based on the SociaLift Platforms in whole or in part, by any means, except as expressly authorized in writing by SociaLift; (ii) use any SociaLift trademarks without prior written permission; (iii) use or launch any automated system, including, “robots,” “spiders,” or “offline readers,” to send messages to the SociaLift Platforms or systems; (ii) use the SociaLift Platforms in any manner that damages, disables, overburdens, or impairs any of SociaLift’s websites or interferes with any other party’s use of the SociaLift Platforms; (iii) attempt to gain unauthorized access (or exceed any authorized access) to SociaLift Platforms; (iv) access the SociaLift Platforms other than through the SociaLift interface; or (v) use the SociaLift Platforms for any purpose or in any manner that is unlawful or prohibited by these Terms. SociaLift hereby grants Influencer a limited, non-exclusive, non-transferable license to access and use the SociaLift Platforms solely as necessary in connection with the provision of Services hereunder.</p>

              <p>EXCEPT AS OTHERWISE SET FORTH HEREIN, TO THE EXTENT PERMITTED BY LAW, THE SociaLift PLATFORMS ARE PROVIDED “AS IS” WITHOUT WARRANTY OR CONDITION OF ANY KIND. EXCEPT AS OTHERWISE SET FORTH HEREIN, SociaLift DISCLAIMS ALL WARRANTIES AND CONDITIONS OF ANY KIND WITH REGARD TO THE SociaLift PLATFORMS INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.</p>

              <p><strong>(b)</strong> SociaLift believes in full transparency and in full, fair and effective disclosures of material facts relating to Influencers’ relationship with SociaLift. Because Influencer has a relationship with SociaLift as a Influencer, in accordance with FTC Endorsement and Testimonial Guidelines (“FTC Guides”), Influencer will include a disclaimer with all Client-Related Content Influencer shares publically stating that Influencer has a material connection to the Client and was compensated or otherwise incentivized to post the Client-Related Content. SociaLift and Client reserve the right to specify the form and content of such disclaimers. Notwithstanding the termination provisions set forth in Section 7, SociaLift reserves the right to immediately terminate these Terms if Influencer fails to make social media or other disclosures in the manner set forth in the FTC Guides and/or as instructed by SociaLift, which failure shall be deemed a material breach of the Terms that is not capable of cure.  SociaLift and Client shall have the right to inspect and/or approve the topics and content of blogs and/or social media posts and other Client-Related Content prior to posting by Influencer and to request revisions if such materials are not approved, such request to be made to Influencer within two (2) business days of Influencer’s submission of such materials. Influencer agrees to submit revised materials within two (2) day(s) of receiving a request for revision from SociaLift.</p>

              <p><strong>(c)</strong> Influencer agrees to defend, indemnify and hold harmless SociaLift, Client and their respective officers, directors, employees, business partners and agents, from and against any and all third party claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney’s fees) arising from: (i) Influencer’s breach of any of its representations and/or warranties hereunder, (ii) the authorized use of the Work Product and other Client-Related Content or exercise of the rights granted hereunder, (iii) Influencer’s use of third party products or content in performing the Services; and (iv) Influencer’s negligence or willful misconduct.</p>

              <p><strong>(d)</strong> Influencer hereby agrees, for herself, her heirs, executors and administrators, to release, waive, discharge, absolve, agree to hold harmless, and covenants not to sue, SociaLift, Client and their respective agents, employees, officers, directors, successors and assigns (collectively, “Released Parties”), from and/or in relation to any and all liability, loss, harm, damage, injury, cost or expense whatsoever which Influencer, his/her heirs, executors, administrators and assigns had, now have or hereafter may have, by reason of any matter connected in any way with the Released Parties’ exercise of their express or implied rights hereunder, including but not limited to the right to use Influencer’s name, voice or likeness, it being understood that the Release Parties shall be free to use Influencer’s name, voice and likeness in any manner in connection with the Client-Related Content or otherwise in support of the purposes of these Terms.</p>

              <p><strong>(e)</strong> Influencer warrants that Influencer is at least 18 years of age, will adhere to FTC Guides and has the right to contract in Influencer’s own name.</p>

              <h5>4) Relationship of Parties.</h5>
              <p>Influencer’s relationship with SociaLift is that of an independent contractor, and nothing in these Terms is intended to, or should be construed to, create a partnership, agency, joint venture or employment relationship. Influencer will not be entitled to any of the benefits that SociaLift may make available to its employees. Influencer is not authorized to make any representation, contract, or commitment on behalf of SociaLift or Client unless specifically requested or authorized in writing to do so by an authorized officer of SociaLift or Client, as applicable, or both. Influencer is solely responsible for, and will file, on a timely basis, all tax returns and payments required to be filed with, or made to, any federal, state or local tax authority with respect to the performance of the Services and receipt of fees under these Terms and will hold SociaLift and Client harmless from and against any tax liability associated with fees hereunder. No part of Influencer’s compensation will be subject to withholding by SociaLift for the payment of any social security, federal, state, or any other employee payroll taxes.</p>

              <h5>5) Confidential Information.</h5>
              <p>Unless authorized by SociaLift, Influencer agrees to hold all Confidential Information in strict confidence, not to disclose Confidential Information to any third parties, and to use Confidential Information solely for the purpose of fulfilling its obligations under these Terms. “Confidential Information” shall mean all information, excluding information available from the public domain, disclosed by SociaLift or Client to Influencer related to these Terms or the current, future, and proposed business, products, and services of SociaLift or Client.</p>

              <h5>6) No Conflict of Interest/Non-Circumvent.</h5>
              <p>Influencer is not subject to, and will not accept, and within the 12 months prior to the Effective Date has not performed, any obligation that is inconsistent or incompatible with Influencer’s obligations under these Terms, including any obligation to perform services for any company whose goods and services compete with those of the Client. Further, Influencer acknowledges and agrees that SociaLift’s relationships with its customers, including Client and other brands, agencies and entities that use SociaLift’s services (“Customers”) are of great value to SociaLift. Accordingly, Influencer agrees that during the term of this Agreement and for one (1) year thereafter, Influencer will not directly or indirectly solicit or engage any Customer to purchase services similar to those provided by SociaLift, other than through SociaLift.</p>

              <h5>7) Term and Termination</h5>
              <p><strong>(a)</strong> Term.The initial term of these Terms shall commence on the Effective Date and continue in full force and effect until terminated as set forth herein or until completion of all Services specified in the Term Sheet, whichever is sooner.</p>

              <p><strong>(b)</strong> Termination.SociaLift may terminate these Terms and/or the Services under any Term Sheet: (i) immediately in the event of a material breach by Influencer or (ii) for convenience at any time. Influencer must return any materials supplied under these Terms upon termination.(c) Survival. The rights and obligations contained in Sections 2 (“Intellectual Property Rights”), 3 (“Representations and Warranties”), 5 (“Confidential Information”), 7(c) (“Survival”), and 8 (“Miscellaneous”) will survive any termination or expiration of these Terms.</p>

              <h5>8) Miscellaneous</h5>
              <p>Influencer will not be entitled to, and hereby waives any right to seek, injunctive relief to enforce the provisions of these Terms, and Influencer’s sole remedy for any breach by SociaLift shall be to recover monetary damages, if any, subject to the terms and conditions herein.</p>

              <p>Influencer may not subcontract or otherwise delegate Influencer’s obligations under these Terms without SociaLift’s prior written consent. Subject to the foregoing, these Terms shall benefit and bind the parties’ successors and permitted assigns. These Terms shall be governed in all respects by the laws of the State of New York and Influencer agrees that unless otherwise indicated by SociaLift any action arising from or relating to these Terms shall be brought exclusively in a state or federal court located in New York, New York. Should any provisions of these Terms be held by a court of law to be illegal, invalid, or unenforceable, the legality, validity and enforceability of the remaining provisions of these Terms shall not be affected or impaired thereby.The waiver by either party of a breach of any provision of these Terms by the other party shall not operate or be construed as a waiver of any other or subsequent breach by the other party. These Terms (including the applicable Term Sheet) constitute the entire agreement between the parties relating to this subject matter and supersedes all prior or contemporaneous oral or written agreements concerning such subject matter. These Terms may only be changed by mutual agreement of authorized representatives of the parties in writing.</p>
            </div>
          }
        />
        <AlertModalDialog
          open={this.state.openRecommendModal}
          onCloseClick={this.closeRecommendModal}
          onClickButton={this.closeRecommendModal}
          content={
            <p>
              Nice to have you on board.
              <br />
              Welcome to {APP_NAME}.
              <br />
              Please use Google Chrome browser for best experience
            </p>
          }
        />
        <Snackbar
          place={place}
          color={color}
          icon={icon}
          message={message}
          open={open}
          closeNotification={closeNotification}
        />
        <LoadingScreen open={isSigningUp} signUp={true} />
        <div className={classes.divSignUp}>
          <IconCard
            customCardClass={classes.customCard}
            customCardTitleClass={classes.cardTitle}
            customCardContentClass={classes.cardContent}
            title={<img src={LOGO} className={classes.imgLogo} />}
            content={
              <form
                className={classes.formSignUp}
                onSubmit={event => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (
                    !(
                      isVerifiedSignUp === false ||
                      isSigningUp ||
                      emailState === "error" ||
                      nameState === "error" ||
                      phoneState === "error" ||
                      errorMessage !== "" ||
                      passwordState === "error" ||
                      passwordConfirmState === "error" ||
                      captchaState === "error" ||
                      name === "" ||
                      email === "" ||
                      phone === "" ||
                      password === ""
                    )
                  ) {
                    this.props.createUser(
                      {
                        name,
                        email,
                        phone,
                        password,
                        is_active: true,
                        captcha,
                        company: "",
                        type: "influencer"
                      },
                      response => {
                        this.props.stoppingSignUp();
                        this.props.dispatchNotification(
                          {
                            message: `Sign up successfully`,
                            open: true,
                            icon: AddAlert
                          },
                          1000
                        );
                        this.openRecommendModal();
                      },
                      this.recaptcha
                    );
                  }
                }}
              >
                <div
                  style={{
                    padding: "5px 0 10px 0"
                  }}
                >
                  Please fill out information to request a influencer account.
                </div>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  spacing={16}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    alignItems="flex-start"
                    justify="flex-start"
                    className={classes.gridFieldContainer}
                  >
                    <CustomInput
                      disabled={isSigningUp}
                      autoFocus={true}
                      success={nameState === "success"}
                      error={nameState === "error"}
                      labelText="Name *"
                      id="name"
                      formControlProps={{
                        className: classes.inputTextField,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: ({ target: { value } }) =>
                          this.props.changeName(value),
                        type: "name",
                        value: name
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  spacing={16}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    alignItems="flex-start"
                    justify="flex-start"
                    className={classes.gridFieldContainer}
                  >
                    <CustomInput
                      disabled={isSigningUp}
                      success={emailState === "success"}
                      error={emailState === "error"}
                      labelText="Email Address *"
                      id="registerEmail"
                      formControlProps={{
                        className: classes.inputTextField,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: ({ target: { value } }) =>
                          this.props.changeEmail(value),
                        // type: 'email',
                        value: email
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    alignItems="flex-end"
                    justify="flex-end"
                    className={classes.gridFieldContainer}
                  >
                    <CustomInput
                      disabled={isSigningUp}
                      success={phoneState === "success"}
                      error={phoneState === "error"}
                      labelText="Phone *"
                      id="phone"
                      formControlProps={{
                        className: classes.inputTextField,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: ({ target: { value } }) =>
                          this.props.changePhone(value),
                        type: "phone",
                        value: phone
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  spacing={16}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    alignItems="flex-start"
                    justify="flex-start"
                    className={classes.gridFieldContainer}
                  >
                    <CustomInput
                      disabled={isSigningUp}
                      success={passwordState === "success"}
                      error={passwordState === "error"}
                      labelText="Password *"
                      id="registerPassword"
                      formControlProps={{
                        className: classes.inputTextField,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: ({ target: { value } }) =>
                          this.props.changePassword(value),
                        type: "password"
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    alignItems="flex-end"
                    justify="flex-end"
                    className={classes.gridFieldContainer}
                  >
                    <CustomInput
                      disabled={isSigningUp}
                      success={passwordConfirmState === "success"}
                      error={passwordConfirmState === "error"}
                      labelText="Re-type Password *"
                      id="registerconfirmpassword"
                      formControlProps={{
                        className: classes.inputTextField,
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: ({ target: { value } }) =>
                          this.props.changePasswordConfirm(value),
                        type: "password"
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  spacing={16}
                  className={classes.checkboxWrapper}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    alignItems="flex-start"
                    justify="flex-start"
                    className={classes.checkboxContainer}
                  >
                    <Checkbox
                      color="primary"
                      className={classes.checkboxTerm}
                      checked={isCheckedTermsConditions}
                      onClick={(event) => this.props.checkTermsConditions(event.target.checked)}
                    />
                    <span className={classes.conditionText}>
                      {"I agree to the SociaLift "}
                      <div
                        className={classes.conditionAction}
                        onClick={() => this.openTermsConditionsModal()}
                      >
                        Terms and Conditions.
                      </div>
                    </span>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={classes.reCaptchaWrapper}
                >
                  <Recaptcha
                    ref={e => (this.recaptcha = e)}
                    disabled={isSigningUp}
                    sitekey="6LfbQJoUAAAAAKnaQ3k3QR4c_aghJ8rxJE-9ezPe"
                    render="explicit"
                    onloadCallback={() => {
                      // console.log('Loading reCaptcha successfully')
                      this.props.verifySignUp(false);
                    }}
                    verifyCallback={response => {
                      if (response) {
                        this.props.verifySignUp(true);
                        this.props.changeCaptcha(response);
                      }
                    }}
                    expiredCallback={() => {
                      this.props.verifySignUp(false);
                    }}
                    size={this.state.width <= 350 ? "compact" : "normal"}
                    hl={"en"}
                  />
                </Grid>
                <div
                  style={{
                    color: "red",
                    padding: "3% 0 0 0"
                  }}
                >
                  {errorMessage}
                </div>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className={classes.footContainer}
                >
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <Button
                      disabled={
                        isCheckedTermsConditions === false ||
                        isVerifiedSignUp === false ||
                        isSigningUp ||
                        emailState === "error" ||
                        nameState === "error" ||
                        phoneState === "error" ||
                        errorMessage !== "" ||
                        passwordState === "error" ||
                        passwordConfirmState === "error" ||
                        captchaState === "error" ||
                        name === "" ||
                        email === "" ||
                        phone === "" ||
                        password === ""
                      }
                      color="primary"
                      className={classes.signUpButton}
                      type="submit"
                    >
                      Create account
                    </Button>
                  </Grid>
                  <Hidden smDown>
                    <Grid
                      item
                      container
                      direction="column"
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      alignItems="flex-end"
                      justify="flex-end"
                    >
                      <div>Have an account?</div>
                      <Link className={classes.loginLink} to="/sign-in">
                        SIGN IN
                      </Link>
                    </Grid>
                  </Hidden>
                  <Hidden mdUp>
                    <Grid
                      item
                      container
                      direction="column"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className={classes.loginMobileStyle}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <div>Have an account?</div>
                      <Link className={classes.loginLink} to="/sign-in">
                        SIGN IN
                      </Link>
                    </Grid>
                  </Hidden>
                </Grid>
              </form>
            }
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ signUpReducer }, ownProps) => ({
  ...signUpReducer,
  ownProps
});
const mapDispatchToProps = {
  changeName,
  changePhone,
  changeErrorMessage,
  changeEmail,
  changePassword,
  changePasswordState,
  changePasswordConfirm,
  changePasswordConfirmState,
  createUser,
  clearState,
  verifySignUp,
  changeCaptcha,
  checkTermsConditions,
  stoppingSignUp,
  submitLogin,
  dispatchNotification,
  closeNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUpForm));
