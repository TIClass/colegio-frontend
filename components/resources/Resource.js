import { useEffect, useState} from 'react';

import axios from 'axios';
import { getCookie } from 'cookies-next';

import LessonResource from './LessonResource';
import QuizResource from './QuizResource';
import MaterialResource from './MaterialResource';
import ArticleResource from './ArticleResource';

function Resource(props) {

  return (
    <div>
      {props.resource?.resource.kind === 'lesson' ?<LessonResource resource={props.resource} video_code={props.resource?.resource?.video_code} name={props.resource?.resource?.name} ></LessonResource>:<div></div>}
      {props.resource?.resource.kind === 'article' ?<ArticleResource video_code={props.resource?.resource?.video_code} ></ArticleResource>:<div></div>}
      {props.resource?.resource.kind === 'material' ?<MaterialResource resource={props.resource} ></MaterialResource>:<div></div>}
      {props.resource?.resource.kind === 'quiz' ?<QuizResource resource={props.resource} resource_id={props.resource?.resource.id} ></QuizResource>:<div></div>}

    </div>
  );
}

export default Resource;
