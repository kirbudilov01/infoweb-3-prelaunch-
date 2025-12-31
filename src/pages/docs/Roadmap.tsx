import '../../scss/DocsPage.scss';

const Roadmap = () => {
  return (
    <>
      <h1>Roadmap</h1>

      <h2 id="mvp-current-state">MVP / Current State</h2>

      <p>
        At its current stage, FABRICBOT operates as a functional MVP. The product is already implemented and used in real-world scenarios, allowing us to validate system architecture, payment flows, and user experience in practice.
      </p>

      <p>The current version of FABRICBOT includes:</p>
      <ul>
        <li>a Telegram Mini App as the primary user interface;</li>
        <li>a smart contract on the TON blockchain responsible for payment acceptance and fund distribution;</li>
        <li>core payment logic;</li>
        <li>single-level referral and partner mechanisms;</li>
        <li>transaction tracking, referral tracking, and basic analytics;</li>
        <li>an open API for integrating payment scenarios.</li>
      </ul>

      <p>
        The MVP is actively used across the team's own products and services. This enables continuous testing in real conditions and iterative improvements based on practical usage rather than assumptions.
      </p>

      <h2 id="near-term-development">Near-Term Development</h2>

      <p>
        The development of FABRICBOT follows a phased approach, with a strong focus on stability, security, and real-world applicability.
      </p>

      <p>In the upcoming stages, we plan to:</p>
      <ul>
        <li>expand payment logic and supported use cases;</li>
        <li>improve the user experience within the Telegram Mini App;</li>
        <li>further develop the Open API and external integrations;</li>
        <li>strengthen partner and referral-based mechanisms.</li>
      </ul>

      <p>
        A dedicated focus is placed on P2P payment scenarios, where one user can execute a payment on behalf of another user, product, or action. This approach enables alternative interaction models based not on direct money transfers, but on the fact of payment execution.
      </p>

      <p>
        An equally important direction is the development of no-code solutions for rapidly creating Telegram-based storefronts using AI-powered, modular components.
      </p>

      <p>In parallel, we plan to grow the FABRICBOT ecosystem through:</p>
      <ul>
        <li>onboarding new partners;</li>
        <li>introducing additional tools for sellers and creators;</li>
        <li>expanding the range of supported platform use cases.</li>
      </ul>

      <h2 id="long-term-vision">Long-Term Vision</h2>

      <p>
        In the long term, FABRICBOT is being developed as a universal payment layer bridging Web2 and Web3.
      </p>

      <p>We see FABRICBOT as an infrastructure solution that:</p>
      <ul>
        <li>simplifies interaction between traditional digital services and the on-chain economy;</li>
        <li>enables payment acceptance through familiar interfaces with on-chain execution;</li>
        <li>lowers the barrier to Web3 adoption for businesses and users.</li>
      </ul>

      <p>
        One of the key strategic directions is connecting fiat-based systems with on-chain economics. FABRICBOT aims to serve as a bridge between these environments while maintaining transparency, predictability, and system integrity.
      </p>

      <p>
        Ecosystem growth is built on a partner-driven model and principles of open integration. We plan to expand geographically and account for regulatory requirements across different regions, creating a platform designed for operation in a global, multi-jurisdictional environment.
      </p>
    </>
  );
};

export default Roadmap;
