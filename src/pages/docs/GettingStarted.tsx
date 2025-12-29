import { Link } from 'react-router-dom';
import '../../scss/DocsPage.scss';
import { useLocale } from '../../hooks/useLocale';

const GettingStarted = () => {
  const { t } = useLocale();

  return (
    <>
      <h1>{t.gettingStarted.title}</h1>

      <h2>{t.gettingStarted.intro.title}</h2>
      <p>{t.gettingStarted.intro.text}</p>

      <h2>{t.gettingStarted.quickStart.title}</h2>

      <h3>{t.gettingStarted.quickStart.step1.title}</h3>
      <p>{t.gettingStarted.quickStart.step1.text}</p>

      <h3>{t.gettingStarted.quickStart.step2.title}</h3>
      <p>{t.gettingStarted.quickStart.step2.text}</p>

      <h3>{t.gettingStarted.quickStart.step3.title}</h3>
      <p>{t.gettingStarted.quickStart.step3.text}</p>

      <h2>{t.gettingStarted.nextSteps.title}</h2>
      <ul>
        <li>{t.gettingStarted.nextSteps.item1} - <Link to="/integration-api">{t.home.sections.integrationAPI.title}</Link></li>
        <li>{t.gettingStarted.nextSteps.item2}</li>
        <li>{t.gettingStarted.nextSteps.item3}</li>
      </ul>
    </>
  );
};

export default GettingStarted;

