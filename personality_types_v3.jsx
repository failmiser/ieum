// 이음 - Personality Types v3 (20 types)
// Each type has a 5-axis signature:
//   E = 외향성 (Extraversion)   W = 따뜻함 (Warmth)
//   C = 호기심 (Curiosity)      F = 자유로움 (Freedom)
//   S = 안정감 (Stability)
// Values are 0..1 (the "ideal" of that type). Scoring finds the closest match.

const P_TYPES_V3 = {
  // ── 밝고 활동적인 그룹 ──────────────────
  SPARK: { key:'SPARK', emoji:'⚡', sig:{E:1.0,W:0.5,C:0.5,F:1.0,S:0.3},
    best:['LISTENER','SCHOLAR','ANCHOR'], tough:['PLANNER','SCHOLAR'],
    i18n:{
      ko:{ label:'스파크', tagline:'분위기 메이커', desc:'어디서든 사람들을 웃게 만드는 에너지의 원천이에요.',
        charm:['방 들어가면 조명 켜짐','처음 보는 사람도 금방 친해짐','멈출 줄 모르는 추진력'], warning:'가끔 텐션이 너무 높아서 주변이 따라오기 힘들어해요' },
      en:{ label:'The Spark', tagline:'Life of the party', desc:'You light up any room you walk into.',
        charm:['Lights up every room','Befriends strangers in minutes','Unstoppable momentum'], warning:'Your energy can leave others a step behind' },
      ja:{ label:'スパーク', tagline:'ムードメーカー', desc:'どこでもみんなを笑顔にするエネルギー源。' },
      es:{ label:'La Chispa', tagline:'Alma de la fiesta', desc:'Iluminas cualquier lugar al entrar.' },
    } },

  CATALYST: { key:'CATALYST', emoji:'🔥', sig:{E:1.0,W:0.8,C:0.7,F:0.9,S:0.5},
    best:['LISTENER','HARMONY','ANCHOR'], tough:['ANCHOR'],
    i18n:{
      ko:{ label:'촉매자', tagline:'판을 바꾸는 사람', desc:'주변에 변화와 영감을 불어넣는 타고난 리더예요.',
        charm:['사람들을 움직이게 함','큰 그림을 잘 그림','위기에 강함'], warning:'혼자 다 하려다 지칠 때가 있어요' },
      en:{ label:'The Catalyst', tagline:'Changer of the game', desc:'You spark change and inspiration in everyone around you.',
        charm:['Moves people to act','Sees the big picture','Calm under pressure'], warning:'You tend to carry everything alone' },
      ja:{ label:'触媒', tagline:'流れを変える人', desc:'周りに変化と刺激を与える生まれつきのリーダー。' },
      es:{ label:'El Catalizador', tagline:'Cambia el juego', desc:'Inspiras cambios en todos a tu alrededor.' },
    } },

  COMEDIAN: { key:'COMEDIAN', emoji:'🎭', sig:{E:1.0,W:0.7,C:0.6,F:1.0,S:0.4},
    best:['LISTENER','DREAMER','STORYTELLER'], tough:['SCHOLAR'],
    i18n:{
      ko:{ label:'익살꾼', tagline:'웃음 제조기', desc:'어색한 순간도 웃음으로 풀어버리는 재주가 있어요.',
        charm:['분위기 리셋 능력','눈치가 빠름','자기 비하 유머의 달인'], warning:'속마음을 농담으로 숨길 때가 있어요' },
      en:{ label:'The Comedian', tagline:'Laughter factory', desc:'You can dissolve any awkward moment with a joke.',
        charm:['Resets any mood','Reads the room fast','Master of self-deprecating humor'], warning:'You hide feelings behind jokes' },
      ja:{ label:'お笑い担当', tagline:'笑いを作る人', desc:'気まずい空気も笑いに変える才能がある。' },
      es:{ label:'El Cómico', tagline:'Fábrica de risas', desc:'Disuelves cualquier momento incómodo con un chiste.' },
    } },

  CHEERLEADER: { key:'CHEERLEADER', emoji:'📣', sig:{E:1.0,W:0.8,C:0.8,F:0.6,S:0.6},
    best:['DREAMER','GUARDIAN','WANDERER'], tough:['DETECTIVE'],
    i18n:{
      ko:{ label:'응원단장', tagline:'1번 타자 응원러', desc:'친구의 성공을 내 일처럼 기뻐하는 사람이에요.',
        charm:['진심 어린 응원','디테일한 칭찬','팀을 하나로 묶음'], warning:'정작 자기 칭찬은 잘 못 받아요' },
      en:{ label:'The Cheerleader', tagline:'Your #1 fan', desc:'You celebrate your friends\' wins like they\'re your own.',
        charm:['Genuine cheering','Specific praise','Brings teams together'], warning:'You rarely accept praise yourself' },
      ja:{ label:'応援団長', tagline:'一番のファン', desc:'友達の成功を自分のことのように喜べる人。' },
      es:{ label:'El Animador', tagline:'Tu fan número uno', desc:'Celebras los logros de tus amigos como si fueran tuyos.' },
    } },

  // ── 따뜻하고 연결하는 그룹 ──────────────
  BRIDGE: { key:'BRIDGE', emoji:'🌉', sig:{E:0.7,W:1.0,C:0.7,F:0.5,S:0.6},
    best:['EXPLORER','STORYTELLER','MAVERICK'], tough:['WANDERER'],
    i18n:{
      ko:{ label:'가교', tagline:'사이를 잇는 사람', desc:'어색한 사람들 사이를 자연스럽게 연결해줘요.',
        charm:['모두를 대화에 끌어들임','편견이 없음','분위기 중재 능력'], warning:'자기 감정은 뒤로 미룰 때가 있어요' },
      en:{ label:'The Bridge', tagline:'Connector of worlds', desc:'You link people together without anyone noticing the effort.',
        charm:['Pulls everyone into the chat','Zero prejudice','Natural mediator'], warning:'You push your own feelings aside' },
      ja:{ label:'架け橋', tagline:'つなぐ人', desc:'気まずい人同士を自然につなげる。' },
      es:{ label:'El Puente', tagline:'Conecta mundos', desc:'Unes a las personas sin que nadie note el esfuerzo.' },
    } },

  HARMONY: { key:'HARMONY', emoji:'🌸', sig:{E:0.6,W:1.0,C:0.5,F:0.4,S:0.8},
    best:['DREAMER','EXPLORER','MAVERICK'], tough:['SPARK'],
    i18n:{
      ko:{ label:'조율자', tagline:'평화 그 자체', desc:'다툼이 생기면 조용히 균형을 맞추는 사람이에요.',
        charm:['갈등을 부드럽게 해결','모두의 의견을 챙김','보고만 있어도 안정됨'], warning:'속으로 참는 게 쌓일 수 있어요' },
      en:{ label:'The Harmony', tagline:'Peace itself', desc:'You quietly restore balance whenever things get tense.',
        charm:['Softens conflicts','Includes everyone','Calming just to be around'], warning:'Swallowed feelings can pile up' },
      ja:{ label:'調和者', tagline:'平和そのもの', desc:'もめごとが起きると静かにバランスを取る人。' },
      es:{ label:'La Armonía', tagline:'La paz misma', desc:'Restauras el equilibrio en silencio cuando todo se tensa.' },
    } },

  GUARDIAN: { key:'GUARDIAN', emoji:'🛡️', sig:{E:0.5,W:1.0,C:0.6,F:0.3,S:0.9},
    best:['WANDERER','MAVERICK','SPARK'], tough:['WANDERER'],
    i18n:{
      ko:{ label:'수호자', tagline:'내 사람 지킴이', desc:'친구가 위험에 빠지면 제일 먼저 달려가는 타입이에요.',
        charm:['의리 하나는 최고','챙길 건 다 챙김','비밀을 절대 안 흘림'], warning:'자기 일은 자꾸 뒤로 미뤄요' },
      en:{ label:'The Guardian', tagline:'Protector of your people', desc:'You run first when a friend is in trouble.',
        charm:['Unshakeable loyalty','Remembers every detail','Absolute vault for secrets'], warning:'You keep postponing your own needs' },
      ja:{ label:'守護者', tagline:'大切な人を守る人', desc:'友達が困ったとき真っ先に駆けつけるタイプ。' },
      es:{ label:'El Guardián', tagline:'Protector de los tuyos', desc:'Corres primero cuando un amigo tiene problemas.' },
    } },

  HEALER: { key:'HEALER', emoji:'💚', sig:{E:0.6,W:1.0,C:0.7,F:0.5,S:0.7},
    best:['MAVERICK','SPARK','SCHOLAR'], tough:['DETECTIVE'],
    i18n:{
      ko:{ label:'힐러', tagline:'마음의 온도 담당', desc:'말없이 곁에 있어주는 것만으로 힘이 되는 사람이에요.',
        charm:['공감 능력 만렙','분위기 온도를 올림','아픈 사람을 알아봄'], warning:'남의 감정을 너무 많이 흡수해요' },
      en:{ label:'The Healer', tagline:'Keeper of the mood', desc:'Just being near you makes people feel better.',
        charm:['Max-level empathy','Raises the room temperature','Senses who\'s hurting'], warning:'You absorb too much of others\' feelings' },
      ja:{ label:'ヒーラー', tagline:'心の温度係', desc:'何も言わずそばにいるだけで力になる人。' },
      es:{ label:'El Sanador', tagline:'Cuida el ambiente', desc:'Solo estar cerca de ti hace sentir mejor a la gente.' },
    } },

  LISTENER: { key:'LISTENER', emoji:'🎧', sig:{E:0.3,W:1.0,C:0.8,F:0.3,S:0.8},
    best:['COMEDIAN','SPARK','STORYTELLER'], tough:['COMEDIAN'],
    i18n:{
      ko:{ label:'경청자', tagline:'진짜 듣는 사람', desc:'말보다 귀가 먼저 움직이는 사람이에요.',
        charm:['끝까지 들어줌','조언이 아닌 공감을 줌','비밀 금고급 입'], warning:'정작 자기 얘기는 잘 안 해요' },
      en:{ label:'The Listener', tagline:'The one who truly hears', desc:'Your ears move before your mouth does.',
        charm:['Hears you to the end','Gives empathy, not lectures','Vault-grade silence'], warning:'You rarely open up about yourself' },
      ja:{ label:'聞き手', tagline:'本当に聞く人', desc:'口より先に耳が動く人。' },
      es:{ label:'El Oyente', tagline:'Quien de verdad escucha', desc:'Tus oídos se mueven antes que tu boca.' },
    } },

  ANCHOR: { key:'ANCHOR', emoji:'⚓', sig:{E:0.4,W:0.9,C:0.3,F:0.2,S:1.0},
    best:['SPARK','CATALYST','COMEDIAN'], tough:['MAVERICK','WANDERER'],
    i18n:{
      ko:{ label:'닻', tagline:'흔들리지 않는 사람', desc:'세상이 흔들려도 중심을 잡아주는 존재예요.',
        charm:['약속은 무조건 지킴','위기에 제일 침착함','오래가는 우정'], warning:'갑작스러운 변화엔 힘들어해요' },
      en:{ label:'The Anchor', tagline:'Never shaken', desc:'You hold the center when everything else sways.',
        charm:['Keeps every promise','Calmest in a crisis','Friendships that last'], warning:'Sudden change throws you off' },
      ja:{ label:'錨', tagline:'ぶれない人', desc:'世界が揺れても軸を保つ存在。' },
      es:{ label:'El Ancla', tagline:'Nunca te tambaleas', desc:'Mantienes el centro cuando todo se mueve.' },
    } },

  PLANNER: { key:'PLANNER', emoji:'📋', sig:{E:0.5,W:0.7,C:0.6,F:0.1,S:1.0},
    best:['DREAMER','WANDERER','MAVERICK'], tough:['SPARK','WANDERER'],
    i18n:{
      ko:{ label:'설계자', tagline:'계획이 곧 힘', desc:'머릿속에 항상 다음 단계가 그려져 있는 사람이에요.',
        charm:['여행 계획은 천재적','빠뜨리는 게 없음','마감을 반드시 지킴'], warning:'계획이 틀어지면 스트레스 급상승' },
      en:{ label:'The Planner', tagline:'Plan is power', desc:'Your head always holds the next three steps.',
        charm:['Genius trip planner','Never misses a detail','Beats every deadline'], warning:'Broken plans stress you out fast' },
      ja:{ label:'設計者', tagline:'計画こそ力', desc:'頭の中に常に次の段階が描かれている人。' },
      es:{ label:'El Planificador', tagline:'Planificar es poder', desc:'Tu cabeza siempre tiene los siguientes pasos.' },
    } },

  // ── 지적이고 관찰하는 그룹 ──────────────
  SCHOLAR: { key:'SCHOLAR', emoji:'📚', sig:{E:0.2,W:0.5,C:1.0,F:0.3,S:0.8},
    best:['SPARK','COMEDIAN','MAVERICK'], tough:['COMEDIAN','SPARK'],
    i18n:{
      ko:{ label:'학자', tagline:'궁금하면 못 참아', desc:'"왜?"라는 질문을 멈추지 않는 탐구형이에요.',
        charm:['깊이 있는 대화','배운 걸 나눠줌','논리가 탄탄함'], warning:'설명이 길어질 때가 있어요' },
      en:{ label:'The Scholar', tagline:'Can\'t stop asking why', desc:'You never stop asking questions.',
        charm:['Deep conversations','Shares what they learn','Rock-solid logic'], warning:'Your explanations run long' },
      ja:{ label:'学者', tagline:'なぜ?が止まらない', desc:'「なぜ」を問い続ける探究型。' },
      es:{ label:'El Erudito', tagline:'No para de preguntar', desc:'Nunca dejas de hacer preguntas.' },
    } },

  DETECTIVE: { key:'DETECTIVE', emoji:'🔍', sig:{E:0.4,W:0.4,C:1.0,F:0.6,S:0.6},
    best:['HEALER','COMEDIAN','MUSE'], tough:['HEALER'],
    i18n:{
      ko:{ label:'탐정', tagline:'다 알아채는 사람', desc:'사소한 변화와 감정을 귀신같이 눈치채요.',
        charm:['눈썰미 최상','거짓말을 못 이김','퍼즐 맞추기 달인'], warning:'너무 많이 알아서 피곤할 때가 있어요' },
      en:{ label:'The Detective', tagline:'Notices everything', desc:'You catch tiny changes and hidden feelings instantly.',
        charm:['Sharpest eye around','Can\'t be lied to','Puzzle-solving master'], warning:'Knowing too much is exhausting' },
      ja:{ label:'探偵', tagline:'全部気づく人', desc:'小さな変化や感情を瞬時に見抜く。' },
      es:{ label:'El Detective', tagline:'Lo nota todo', desc:'Captas cambios mínimos y sentimientos ocultos al instante.' },
    } },

  STORYTELLER: { key:'STORYTELLER', emoji:'📖', sig:{E:0.9,W:0.8,C:0.8,F:0.7,S:0.5},
    best:['LISTENER','HEALER','ANCHOR'], tough:['PLANNER'],
    i18n:{
      ko:{ label:'이야기꾼', tagline:'얘기 보따리', desc:'평범한 일도 재미있는 이야기로 만드는 능력이 있어요.',
        charm:['분위기를 살림','기억력이 좋음','말로도 글로도 능숙'], warning:'얘기가 길어질 때가 있어요' },
      en:{ label:'The Storyteller', tagline:'Bag full of stories', desc:'You turn ordinary days into great stories.',
        charm:['Keeps the vibe alive','Amazing memory','Great in speech and writing'], warning:'Your stories run long' },
      ja:{ label:'語り手', tagline:'話の宝庫', desc:'普通の出来事を面白い話に変える力がある。' },
      es:{ label:'El Narrador', tagline:'Bolsa de historias', desc:'Conviertes días normales en grandes historias.' },
    } },

  DREAMER: { key:'DREAMER', emoji:'☁️', sig:{E:0.3,W:0.7,C:1.0,F:0.8,S:0.4},
    best:['PLANNER','ANCHOR','GUARDIAN'], tough:['DETECTIVE'],
    i18n:{
      ko:{ label:'몽상가', tagline:'상상 속 작업실', desc:'머릿속에 자기만의 세계가 있는 사람이에요.',
        charm:['상상력이 남다름','감성이 풍부함','남이 못 보는 걸 봄'], warning:'현실 체크가 필요할 때가 있어요' },
      en:{ label:'The Dreamer', tagline:'Studio in the clouds', desc:'You carry a whole world inside your head.',
        charm:['Wild imagination','Rich emotional sense','Sees what others miss'], warning:'A reality check helps sometimes' },
      ja:{ label:'夢見人', tagline:'想像の中の作業場', desc:'頭の中に自分だけの世界を持つ人。' },
      es:{ label:'El Soñador', tagline:'Taller en las nubes', desc:'Llevas un mundo entero en tu cabeza.' },
    } },

  MUSE: { key:'MUSE', emoji:'🎨', sig:{E:0.5,W:0.7,C:0.9,F:1.0,S:0.3},
    best:['PLANNER','GUARDIAN','ANCHOR'], tough:['PLANNER'],
    i18n:{
      ko:{ label:'뮤즈', tagline:'영감을 주는 사람', desc:'옆에 있으면 뭔가 만들고 싶어지는 사람이에요.',
        charm:['감각이 좋음','사람에게 영감을 줌','취향이 뚜렷함'], warning:'기분 따라 하루가 달라져요' },
      en:{ label:'The Muse', tagline:'Giver of inspiration', desc:'Being near you makes people want to create.',
        charm:['Great taste','Inspires others','Unmistakable style'], warning:'Your mood sets the whole day' },
      ja:{ label:'ミューズ', tagline:'ひらめきを与える人', desc:'そばにいると何か作りたくなる人。' },
      es:{ label:'La Musa', tagline:'Da inspiración', desc:'Estar cerca de ti hace que la gente quiera crear.' },
    } },

  // ── 자유롭고 독립적인 그룹 ──────────────
  EXPLORER: { key:'EXPLORER', emoji:'🧭', sig:{E:0.6,W:0.5,C:1.0,F:1.0,S:0.4},
    best:['ANCHOR','LISTENER','PLANNER'], tough:['ANCHOR'],
    i18n:{
      ko:{ label:'탐험가', tagline:'가보자고!', desc:'안 가본 길이 있으면 일단 가봐야 하는 사람이에요.',
        charm:['새로운 걸 두려워 안 함','적응이 빠름','경험치가 계속 쌓임'], warning:'한 곳에 오래 못 있어요' },
      en:{ label:'The Explorer', tagline:'Let\'s go!', desc:'If there\'s an untried path, you have to walk it.',
        charm:['Fearless of the new','Adapts instantly','Always gaining XP'], warning:'You can\'t stay put for long' },
      ja:{ label:'探検家', tagline:'行ってみよう!', desc:'行ったことのない道があれば行きたくなる人。' },
      es:{ label:'El Explorador', tagline:'¡Vamos!', desc:'Si hay un camino sin probar, tienes que recorrerlo.' },
    } },

  WANDERER: { key:'WANDERER', emoji:'🍃', sig:{E:0.5,W:0.4,C:0.5,F:1.0,S:0.2},
    best:['PLANNER','ANCHOR','GUARDIAN'], tough:['ANCHOR','PLANNER'],
    i18n:{
      ko:{ label:'방랑자', tagline:'자유가 제일', desc:'정해진 것보다 즉흥이 편한 자유로운 영혼이에요.',
        charm:['어디든 잘 적응','속박을 싫어함','의외로 다정함'], warning:'약속 잡기가 좀 어려워요' },
      en:{ label:'The Wanderer', tagline:'Freedom first', desc:'A free spirit who prefers improvising over planning.',
        charm:['Adapts anywhere','Hates being boxed in','Surprisingly tender'], warning:'Hard to pin down for plans' },
      ja:{ label:'放浪者', tagline:'自由が一番', desc:'決まったことより即興が楽な自由な魂。' },
      es:{ label:'El Vagabundo', tagline:'Libertad primero', desc:'Espíritu libre que prefiere improvisar.' },
    } },

  MAVERICK: { key:'MAVERICK', emoji:'🚀', sig:{E:0.7,W:0.4,C:0.5,F:1.0,S:0.3},
    best:['GUARDIAN','HEALER','PLANNER'], tough:['PLANNER'],
    i18n:{
      ko:{ label:'자유인', tagline:'남들 하는 대로는 안 함', desc:'정해진 답보다 자기만의 답을 찾는 사람이에요.',
        charm:['자기 색이 확실함','용기가 있음','새로운 걸 먼저 시도함'], warning:'가끔 고집이 세져요' },
      en:{ label:'The Maverick', tagline:'Never follows the crowd', desc:'You find your own answers instead of taking the given ones.',
        charm:['Strong sense of self','Real courage','First to try new things'], warning:'You can get stubborn' },
      ja:{ label:'自由人', tagline:'人と同じは嫌', desc:'決まった答えより自分だけの答えを探す人。' },
      es:{ label:'El Inconformista', tagline:'Nunca sigue a la multitud', desc:'Encuentras tus propias respuestas.' },
    } },

  NIGHTOWL: { key:'NIGHTOWL', emoji:'🦉', sig:{E:0.3,W:0.4,C:1.0,F:0.8,S:0.5},
    best:['SPARK','CHEERLEADER','STORYTELLER'], tough:['CHEERLEADER'],
    i18n:{
      ko:{ label:'올빼미', tagline:'새벽 감성', desc:'낮보다 밤에 더 선명해지는 사람이에요.',
        charm:['혼자만의 시간을 잘 씀','깊은 생각을 함','조용한 관찰자'], warning:'아침 약속은 조심하세요' },
      en:{ label:'The Night Owl', tagline:'Born at 2am', desc:'You come alive when the sun goes down.',
        charm:['Great at solitude','Thinks deeply','Quiet observer'], warning:'Beware morning appointments' },
      ja:{ label:'夜型', tagline:'深夜の感性', desc:'昼より夜のほうが鮮明になる人。' },
      es:{ label:'El Nocturno', tagline:'Nacido a las 2am', desc:'Cobras vida cuando se pone el sol.' },
    } },
};

// Support older code that reads PERSONALITY_TYPES[key].label / .desc directly
Object.keys(P_TYPES_V3).forEach((k) => {
  const t = P_TYPES_V3[k];
  const label = {}, desc = {};
  Object.keys(t.i18n).forEach((lg) => {
    label[lg] = t.i18n[lg].label;
    desc[lg] = t.i18n[lg].desc;
  });
  t.label = label;
  t.desc = desc;
});

// Replace the global type registry with the expanded v3 set
window.PERSONALITY_TYPES = P_TYPES_V3;
window.P_TYPES_V3 = P_TYPES_V3;

// Rebuild the compatibility map so the result screen keeps working
const MATCHES_V3 = {};
Object.values(P_TYPES_V3).forEach((t) => {
  MATCHES_V3[t.key] = { good: t.best || [], tough: t.tough || [] };
});
window.PERSONALITY_MATCHES = MATCHES_V3;
