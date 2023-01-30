import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  // description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: `Welcome, I'm Blue`,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    image: require('@site/static/img/blue-jerry-2.png').default,
  },
];

function Feature({ title, image }: FeatureItem) {
  return (
    <div className={clsx('col col--12')}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h1>{title}</h1>
        <span>{`\tDesigned by Shine`}</span>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
