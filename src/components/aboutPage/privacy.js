import React, { Component } from "react";
import myrLogo from "./img/MYR-Logo.png";
import myrHeaderImage from "./img/queen_status.png";

class Privacy extends Component {
    handleNavigation() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-theme static-top fixed-top text-uppercase px-3" id="mainNav" style={{backgroundColor: "#4E4E4E"}}>
                <a className="navbar-brand text-theme mx-2 text-warning" href="../">
                    <img src={myrLogo} width="30 " height="30 " className="d-inline-block align-top " alt=" "></img>
                    MYR
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav-orange ms-auto " >
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="/about/">About</a>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="../../">Editor</a>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="/about/support">Support</a>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="/about/team">Team</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

    myrHeader() {
        return (
            <header>
                <div className="container text-center mt-5 pt-5 pb-2">
                    <div className="row align-items-center">
                        <div className="col-md mx-2" >
                            <h1 className="display-4 fw-light ">MYR</h1>
                            <p className="lead mb-4 ">A virtual reality experience for the classroom.</p>
                        </div>
                        <div className="col-md mx-2">
                            <div className="card ">
                                <img src={myrHeaderImage} className="card-img-top " alt="User Example - Queen Status by Shandira Ferguson "></img>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    privacyPolicy() {
        return (
            <div className="row justify-content-center ">
                <div className="col-sm-9 col-xs-12 ">
                    <div className="list-group ">
                        <div className="card-header ">
                            <h2 className="text-center ">Privacy Policy</h2>
                            <p className="text-center ">
                                <a>MYR is governed by the following privacy policy.</a>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h1 className="mb-1 ">Privacy Policy</h1>
                                <small>Effective date: October 01, 2018</small>
                            </div>
                            <p className="mb-1 ">
                                <p>University of Massachusetts Lowell, Engaging Computing Group (&quot;us&quot;, &quot;we&quot;, or
                                    &quot;our&quot;)
                                    operates the <a href="http://learnmyr.org ">learnmyr.org</a> website (the &quot;Service&quot;).</p>
                                <p>The Service is also governed by our Terms of Service located at <a href="../tos ">learnmyr.org/about/tos</a>.</p>
                                <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data
                                    when you
                                    use our Service and the choices you have associated with that data.</p>
                                <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection
                                    and
                                    use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy,
                                    terms
                                    used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from <a href="http://learnmyr.org " target="_blank ">learnmyr.org</a>.
                                </p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Information Collection And Use</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>We collect several different types of information for various purposes to provide and improve our
                                    Service to
                                    you.
                                </p>
                                <h3>Types of Data Collected</h3>
                                <h4>Personal Data</h4>
                                <p>While using our Service, we may ask you to provide us with certain personally identifiable information
                                    that
                                    can be used to contact or identify you (&quot;Personal Data&quot;). Personally identifiable information
                                    may
                                    include, but is not limited to:</p>
                                <ul>
                                    <li>Email address</li>
                                    <li>First name and last name</li>
                                    <li>Cookies and Usage Data</li>
                                </ul>
                                <h4>Usage Data</h4>
                                <p>We may also collect information how the Service is accessed and used (&quot;Usage Data&quot;). This
                                    Usage Data
                                    may include information such as your computer&#39;s Internet Protocol address (e.g. IP address), browser
                                    type, browser version, the pages of our Service that you visit, the time and date of your visit, the
                                    time
                                    spent on those pages, unique device identifiers and other diagnostic data.
                                </p>
                                <h4>Tracking &amp; Cookies Data</h4>
                                <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain
                                    information.
                                </p>
                                <p>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies
                                    are sent
                                    to your browser from a website and stored on your device. Tracking technologies also used are beacons,
                                    tags,
                                    and scripts to collect and track information and to improve and analyze our Service.</p>
                                <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                    However, if
                                    you do not accept cookies, you may not be able to use some portions of our Service.</p>
                                <p>Examples of Cookies we use:</p>
                                <ul>
                                    <li>
                                        <strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
                                    <li>
                                        <strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and
                                        various settings.
                                    </li>
                                    <li>
                                        <strong>Security Cookies.</strong> We use Security Cookies for security purposes.</li>
                                </ul>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Use of Data</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>University of Massachusetts Lowell, Engaging Computing Group uses the collected data for various
                                    purposes:
                                </p>
                                <ul>
                                    <li>To provide and maintain the Service</li>

                                    <li>To notify you about changes to our Service</li>
                                    <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                                    <li>To provide customer care and support</li>
                                    <li>To provide analysis or valuable information so that we can improve the Service</li>
                                    <li>To monitor the usage of the Service</li>
                                    <li>To detect, prevent and address technical issues</li>
                                </ul>
                                <p>In addition to the above, the Service is a research tool. Your data may be used for educational
                                    research and
                                    be publicly released. Any data that is publicly released as part of a research study will be anonymized.
                                </p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Transfer of Data</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>Your information, including Personal Data, may be transferred to — and maintained on — computers
                                    located outside
                                    of your state, province, country or other governmental jurisdiction where the data protection laws may
                                    differ
                                    than those from your jurisdiction.</p>
                                <p>If you are located outside United States and choose to provide information to us, please note that we
                                    transfer
                                    the data, including Personal Data, to United States and process it there.</p>
                                <p>Your consent to this Privacy Policy followed by your submission of such information represents your
                                    agreement
                                    to that transfer.</p>
                                <p>University of Massachusetts Lowell, Engaging Computing Group will take all steps reasonably necessary
                                    to ensure
                                    that your data is treated securely and in accordance with this Privacy Policy and no transfer of your
                                    Personal
                                    Data will take place to an organization or a country unless there are adequate controls in place
                                    including
                                    the security of your data and other personal information.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Disclosure of Data</h2>
                            </div>
                            <p className="mb-1 ">
                                <h3>Legal Requirements</h3>
                                <p>University of Massachusetts Lowell, Engaging Computing Group may disclose your Personal Data in the
                                    good faith
                                    belief that such action is necessary to:</p>
                                <ul>
                                    <li>To comply with a legal obligation</li>

                                    <li>To protect and defend the rights or property of University of Massachusetts Lowell, Engaging
                                    Computing Group
                                    </li>
                                    <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                                    <li>To protect the personal safety of users of the Service or the public</li>
                                    <li>To protect against legal liability</li>
                                </ul>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Security of Data</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>The security of your data is important to us, but remember that no method of transmission over the
                                    Internet,
                                    or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
                                    protect
                                    your Personal Data, we cannot guarantee its absolute security.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Service Providers</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>We may employ third party companies and individuals to facilitate our Service (&quot;Service
                                    Providers&quot;),
                                    to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing
                                    how
                                    our Service is used.</p>
                                <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are
                                    obligated
                                    not to disclose or use it for any other purpose.</p>
                                <h3>Analytics</h3>
                                <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
                                <ul>
                                    <li>
                                        <strong>Google Analytics</strong>
                                    </li>
                                    <ul>
                                        <li>Google Analytics is a web analytics service offered by Google that tracks and reports website
                                            traffic.
                                            Google uses the data collected to track and monitor the use of our Service. This data is shared with
                                            other Google services. Google may use the collected data to contextualize and personalize the ads of
                                            its own advertising network.</li>
                                        <li>You can opt-out of having made your activity on the Service available to Google Analytics by
                                            installing
                                            the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript
                                            (ga.js,
                                            analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.
                                        </li>
                                        <li>For more information on the privacy practices of Google, please visit the Google Privacy &amp;
                                            Terms web
                                            page: <a href="https://policies.google.com/privacy?hl=en "
                                            target="_blank ">https://policies.google.com/<wbr />privacy?hl=en</a>
                                        </li>
                                    </ul>
                                </ul>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Links to Other Sites</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party
                                    link,
                                    you will be directed to that third party&#39;s site. We strongly advise you to review the Privacy Policy
                                    of every site you visit.</p>
                                <p>We have no control over and assume no responsibility for the content, privacy policies or practices of
                                    any
                                    third party sites or services.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Children&#39;s Privacy</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>Due to the nature of the Service, we offer its use to all persons, including children. Children are
                                    able to
                                    login or register for a new account. Account registration via third party services is governed under
                                    their
                                    own privacy policy. We do not require any information to use the Service. If a user is under the age of
                                    13,
                                    contact information for a parent or guardian will be collected. In the event that you believe your child
                                    has created an account without your approval, please contact <a href="mailto:privacy@learnmyr.org " target="_blank ">privacy@learnmyr.org</a>.</p>
                                <p>Due to the nature of the Service, your child will be generating content. The content created may be
                                    shared
                                    with third parties or used for research purposes. We will make an effort to anonymize all released data,
                                    but there are no guarantees to restrict the content created and shared by your child.</p>
                                <p>In the event the Service is being used in an educational setting, COPPA allows school administrators to
                                    provide
                                    consent for the child. For information about a specific school’s policies, please contact the school
                                    directly
                                    or visit the Family Educational Rights and Privacy Act (FERPA) website at
                                <u>
                                    <a href="https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html "
                                        target="_blank ">https://www2.ed.gov/policy/<wbr />gen/guid/fpco/ferpa/index.html</a>
                                </u><wbr />. Information about COPPA can be found at
                                <u>
                                    <a href="https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule "
                                        target="_blank ">https://www.ftc.gov/<wbr />enforcement/rules/rulemaking-<wbr />regulatory-reform-proceedings/<wbr />childrens-online-privacy-<wbr />protection-rule</a>
                                </u>.</p>
                                <p>Due to the technical nature of the Service, persistent identifiers about children may be stored both
                                    locally
                                    on the child’s device and remotely via the Service or a third party. This includes information such as
                                    the
                                    child’s IP address, the web browser, cookies, or other unique identifiers.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Changes To This Privacy Policy</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                                    new Privacy
                                    Policy on this page.</p>
                                <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                                    Policy
                                    are effective when they are posted on this page.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Contact Us</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                                <ul>
                                    <li>By email:
                                        <a href="mailto:privacy@learnmyr.org " target="_blank ">privacy@learnmyr.org</a>
                                    </li>

                                    <li>By mail: </li>
                                    <blockquote>Engaging Computing Group
                                        <br /> Department of Computer Science
                                        <br /> 1 University Avenue
                                        <br /> Lowell, MA 01854
                                    </blockquote>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    aboutFooter() {
        return (
            <footer className="footer p-5" style={{backgroundColor: "#EBEDEF"}}>
                <div className="d-flex justify-content-center ">
                    <div className="row">
                        <div className="col h-100 text-center text-lg-start my-auto">
                            <ul className="footer about-footer list-inline mb-2">
                                <li className="footer-links list-inline-item">
                                    <a href="/about/ ">About</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="../../">Editor</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="# ">Support</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="/about/team ">Team</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="/about/tos ">Terms of Service</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="/about/privacy ">Privacy Policy</a>
                                </li>
                            </ul>
                            <p className="small mb-4 mb-lg-0 about-footer">&copy; 2018 - <span id="date"></span> - University of Massachusetts Lowell,
                                <a href="https://sites.uml.edu/engaging-computing "> Engaging Computing Group</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    render() {
        return (
            <div>                
                <this.handleNavigation></this.handleNavigation>
                <div style={{backgroundColor: "#EBEDEF"}}>
                    <this.myrHeader></this.myrHeader>
                    <this.privacyPolicy></this.privacyPolicy>
                    <this.privacyFooter></this.privacyFooter>
                </div>
            </div>
        );
    }
}

export default Privacy;