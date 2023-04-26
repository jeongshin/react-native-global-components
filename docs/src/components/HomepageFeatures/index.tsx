import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: `Headless`,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    image: require('@site/static/img/blue-jerry-3.png').default,
    description: `Make your own popup\nwith hooks & APIs we provides`,
  },
  {
    title: `UIs`,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    image: require('@site/static/img/blue-jerry-2.png').default,
    description: 'Multiple sample UIs\neasy to use and customize',
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h1>{title}</h1>
        <span style={{ whiteSpace: 'pre' }}>{description}</span>
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
