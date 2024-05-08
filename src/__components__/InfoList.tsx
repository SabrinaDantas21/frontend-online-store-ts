import { InfoListProp } from '../types';

function InfoList({ especification, description }: InfoListProp) {
  return (
    <li>
      {especification}
      :
      {' '}
      {description}
    </li>
  );
}

export default InfoList;
