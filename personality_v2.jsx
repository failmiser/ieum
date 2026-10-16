// 이음 - Personality Test v4
// 자연스럽고 재미있는 질문 10개 × 4지선다.
// 5개 축으로 점수를 매겨서 20개 유형 중 가장 가까운 유형을 찾아요.
//   E = 외향성   W = 따뜻함   C = 호기심   F = 자유로움   S = 안정감
// 각 선택지는 축에 +1 / -1 을 기여해요. 무작위로 답해도 모든 유형이 고르게 나오도록
// z-정규화로 편향을 제거합니다.

const PQ3 = [
  {
    text: {
      ko:'금요일 밤, 갑자기 친구가 "지금 나올 수 있어?" 라고 물으면?',
      en:'Friday night — a friend texts "Can you come out right now?"',
      ja:'金曜の夜、友達から「今すぐ出られる?」と連絡が来たら?',
      zh:'周五晚上朋友突然问“现在能出来吗?”',
      es:'Viernes por la noche: ¿"Puedes salir ahora mismo?"',
      fr:'Vendredi soir : « Tu peux sortir là, maintenant ? »',
      de:'Freitagabend: „Kommst du jetzt sofort raus?"',
      vi:'Tối thứ Sáu, bạn nhắn "Ra ngoài luôn không?"',
      th:'คืนวันศุกร์ เพื่อนทัก "ออกมาได้เลยมั้ย?"',
      pt:'Sexta à noite: "Dá pra sair agora?"',
      hi:'शुक्रवार रात — "अभी निकल सकते हो?"',
      ar:'ليلة الجمعة: "هل يمكنك الخروج الآن؟"',
    },
    options: [
      { text: { ko:'"ㅇㅇ 어디?" 3초 만에 답장', en:'"Yep, where?" — replied in 3 seconds', ja:'「うん、どこ?」3秒で返信', zh:'“好,在哪?”3秒回复', es:'"Sí, ¿dónde?" — en 3 segundos', fr:'« Oui, où ? » — en 3 secondes', de:'"Ja, wo?" — in 3 Sekunden', vi:'"Ừ, ở đâu?" — trả lời trong 3 giây', th:'"ได้ ที่ไหน?" — ตอบใน 3 วิ', pt:'"Sim, onde?" — em 3 segundos', hi:'"हाँ, कहाँ?" — 3 सेकंड में जवाब', ar:'"نعم، أين؟" — في 3 ثوانٍ' }, w:{E:1, F:1} },
      { text: { ko:'"ㅠㅠ 오늘은 집콕이야… 다음에 꼭!"', en:'"Ah, staying in tonight… next time!"', ja:'「ごめん、今日は家…次こそ!」', zh:'“今天想在家…下次一定!”', es:'"Hoy me quedo en casa… ¡la próxima!"', fr:'« Ce soir je reste chez moi… la prochaine ! »', de:'"Heute bleib ich daheim… nächstes Mal!"', vi:'"Hôm nay ở nhà… lần sau nhé!"', th:'"วันนี้อยู่บ้าน… ครั้งหน้าละกัน!"', pt:'"Hoje fico em casa… na próxima!"', hi:'"आज घर पर हूँ… अगली बार!"', ar:'"سأبقى في البيت… في المرة القادمة!"' }, w:{E:-1, S:1} },
      { text: { ko:'"잠깐만, 옷만 갈아입고 갈게"', en:'"Give me 5 minutes to change"', ja:'「ちょっと待って、着替えて行く」', zh:'“等等,我换件衣服就去”', es:'"Dame 5 min para cambiarme"', fr:'« 5 minutes, je me change »', de:'"5 Minuten, ich zieh mich um"', vi:'"Đợi 5 phút mình thay đồ"', th:'"รอ 5 นาที เปลี่ยนชุดก่อน"', pt:'"5 minutos pra me trocar"', hi:'"5 मिनट, कपड़े बदल लूँ"', ar:'"5 دقائق لأغيّر ملابسي"' }, w:{E:1, S:0} },
      { text: { ko:'"누구누구 있어?" — 누가 오는지 먼저 확인', en:'"Who\'s going?" — need the full list first', ja:'「誰がいるの?」— メンバー確認から', zh:'“都有谁?”—先问清楚名单', es:'"¿Quién va?" — primero la lista', fr:'« Qui vient ? » — la liste d\'abord', de:'"Wer kommt?" — erst die Liste', vi:'"Có những ai?" — hỏi danh sách trước', th:'"มีใครบ้าง?" — ถามรายชื่อก่อน', pt:'"Quem vai?" — primeiro a lista', hi:'"कौन-कौन है?" — पहले लिस्ट', ar:'"من سيأتي؟" — القائمة أولاً' }, w:{E:1, C:1} },
    ],
  },
  {
    text: {
      ko:'친구가 "너 이거 진짜 좋아할 것 같아" 하면서 뭔가 보여줬는데… 솔직히 별로야.',
      en:'A friend shows you something saying "you\'ll love this" — but honestly, you don\'t.',
      ja:'友達が「これ絶対好きだよ」と見せてきたけど…正直ピンと来ない。',
      zh:'朋友说“你肯定会喜欢这个”给你看…但说实话你觉得一般。',
      es:'Un amigo te muestra algo: "¡te va a encantar!" — pero no tanto.',
      fr:'Un ami te montre un truc « tu vas adorer » — mais bof.',
      de:'Ein Freund zeigt dir was: „Das liebst du!" — ehrlich? Nicht so.',
      vi:'Bạn khoe "cậu sẽ thích cái này" — nhưng thật ra không.',
      th:'เพื่อนโชว์ "นายต้องชอบแน่ๆ" — แต่จริงๆ ไม่ค่อยชอบ',
      pt:'Um amigo mostra algo: "você vai amar!" — mas nem tanto.',
      hi:'दोस्त दिखाता है "तुम्हें पसंद आएगा" — पर सच में नहीं।',
      ar:'يعرض صديق شيئًا: "ستحبه!" — لكنك لا تحبه.',
    },
    options: [
      { text: { ko:'"오 진짜?" 하고 같이 신나해준다', en:'"Oh really?!" — match their excitement', ja:'「おっ、本当?」と一緒に盛り上がる', zh:'“哦真的?”跟着一起兴奋', es:'"¿En serio?" — me sumo igual', fr:'« Ah oui ? » — je m\'enthousiasme avec lui', de:'"Echt?!" — ich freue mich mit', vi:'"Thật hả?" — vui cùng bạn', th:'"จริงดิ?" — ทำเป็นตื่นเต้นด้วย', pt:'"Sério?!" — me empolgo junto', hi:'"अच्छा?!" — साथ में खुश हो जाता हूँ', ar:'"حقًا؟!" — أشاركه الحماس' }, w:{W:1, E:1} },
      { text: { ko:'솔직하게 "음… 내 취향은 아닌데"', en:'Honestly: "hmm, not really my thing"', ja:'正直に「うーん、私の好みではないかな」', zh:'老实说“嗯…不太合我口味”', es:'Sincero: "mm, no es lo mío"', fr:'Franchement : « pas trop mon truc »', de:'Ehrlich: "Hmm, nicht mein Ding"', vi:'Thật lòng: "ừm, không phải gu mình"', th:'พูดตรงๆ "อืม ไม่ใช่แนวเรา"', pt:'Sincero: "hmm, não é minha praia"', hi:'सच: "हम्म, मेरी पसंद नहीं"', ar:'بصراحة: "ليس من ذوقي"' }, w:{W:-1, F:1, C:0} },
      { text: { ko:'"오 이거 만든 사람 누구야?" 궁금한 걸 물어본다', en:'"Who made this?" — ask about the maker', ja:'「これ作った人誰?」と気になる方へ', zh:'“这是谁做的?”好奇地问', es:'"¿Quién lo hizo?" — pregunto', fr:'« Qui a fait ça ? » — je creuse', de:'"Wer hat das gemacht?" — ich frage nach', vi:'"Ai làm cái này?" — hỏi han', th:'"ใครทำนี่?" — ถามถึงคนทำ', pt:'"Quem fez isso?" — pergunto', hi:'"यह किसने बनाया?" — पूछता हूँ', ar:'"من صنع هذا؟" — أسأل' }, w:{C:1, E:1} },
      { text: { ko:'"아 이런 취향도 있구나" 하고 조용히 배운다', en:'"Didn\'t know that was your taste" — quietly note it', ja:'「へえ、そういう好みなんだ」と静かに学ぶ', zh:'“原来你喜欢这种”默默记下来', es:'"No sabía que te gustaba eso" — lo anoto', fr:'« Je ne savais pas » — je le note', de:'"Das wusste ich nicht" — ich merke es mir', vi:'"Ra là bạn thích kiểu này" — ghi nhớ', th:'"อ๋อ ชอบแบบนี้นี่เอง" — จำไว้', pt:'"Não sabia disso" — anoto', hi:'"यह तो नहीं पता था" — याद रखता हूँ', ar:'"لم أكن أعلم" — أسجّلها' }, w:{W:1, C:1, E:-1} },
    ],
  },
  {
    text: {
      ko:'여행 계획을 세운다면 나는?',
      en:'Planning a trip — what\'s your role?',
      ja:'旅行の計画、私は?',
      zh:' планирование? 旅行计划的角色?',
      es:'Planeando un viaje, ¿cuál es tu rol?',
      fr:'Préparer un voyage — ton rôle ?',
      de:'Eine Reise planen — deine Rolle?',
      vi:'Lên kế hoạch du lịch — vai của bạn?',
      th:'วางแผนเที่ยว — บทบาทของคุณ?',
      pt:'Planejando uma viagem — seu papel?',
      hi:'यात्रा की योजना में आपकी भूमिका?',
      ar:'تخطيط رحلة — دورك؟',
    },
    options: [
      { text: { ko:'숙소·동선·맛집 다 리스트업 완료', en:'Hotels, routes, restaurants — all listed', ja:'宿・ルート・グルメ全部リスト化', zh:'住宿、路线、美食全部列好', es:'Hoteles, rutas y restaurantes listos', fr:'Hôtels, trajets, restos — tout est listé', de:'Hotels, Routen, Restaurants — alles gelistet', vi:'Khách sạn, lộ trình, quán ăn — xong hết', th:'ที่พัก เส้นทาง ร้านอาหาร — ลิสต์ครบ', pt:'Hotéis, rotas, restaurantes — tudo listado', hi:'होटल, रास्ता, रेस्टोरेंट — सब लिस्ट', ar:'الفنادق والمسارات والمطاعم — كلها جاهزة' }, w:{S:1, C:1, F:-1} },
      { text: { ko:'"가서 정하면 되지!" 일단 비행기만 끊는다', en:'"We\'ll figure it out there!" — just book the flight', ja:'「行ってから決めよう!」飛行機だけ取る', zh:'“到了再说!”只订机票', es:'"¡Ya veremos allá!" — solo el vuelo', fr:'« On verra sur place ! » — juste l\'avion', de:'"Das sehen wir vor Ort!" — nur den Flug', vi:'"Tới đó tính!" — chỉ đặt vé', th:'"ไปถึงค่อยว่ากัน!" — จองแค่ตั๋ว', pt:'"A gente vê lá!" — só a passagem', hi:'"वहीं तय करेंगे!" — बस टिकट', ar:'"سنتدبر هناك!" — التذكرة فقط' }, w:{F:1, E:1, S:-1} },
      { text: { ko:'"가서 정하자" 하면서도 조용히 검색은 해둔다', en:'Say "we\'ll wing it" — but research secretly', ja:'「行ってから」と言いつつ密かに下調べ', zh:'嘴上说“到了再说”,私下偷偷查', es:'Digo "improvisamos" pero investigo en secreto', fr:'Je dis « on verra » mais je fouille en secret', de:'Sage "machen wir spontan" — recherchiere heimlich', vi:'Nói "tùy hứng" nhưng âm thầm tìm hiểu', th:'พูดว่า "แล้วแต่" แต่แอบหาข้อมูล', pt:'Falo "vamos improvisar" mas pesquiso escondido', hi:'कहता "वहीं देखेंगे" पर गुपचुप खोजता हूँ', ar:'أقول "سنتدبر" لكن أبحث سرًا' }, w:{F:1, S:1, C:0} },
      { text: { ko:'"어디 가고 싶은 데 있어?" 다 같이 의견 맞춘다', en:'"Where do you all want to go?" — align everyone', ja:'「みんな行きたいとこある?」意見を合わせる', zh:'“你们想去哪?”一起对意见', es:'"¿Dónde quieren ir?" — consenso', fr:'« Vous voulez aller où ? » — on décide ensemble', de:'"Wo wollt ihr hin?" — alle einbeziehen', vi:'"Mọi người muốn đi đâu?" — thống nhất', th:'"อยากไปไหนกัน?" — หาฉันทามติ', pt:'"Onde vocês querem ir?" — alinho com todos', hi:'"कहाँ जाना है?" — सबकी राय लेता हूँ', ar:'"إلى أين تريدون؟" — نوافق الجميع' }, w:{W:1, E:0} },
    ],
  },
  {
    text: {
      ko:'친구가 "나 오늘 좀 우울해"라고 했을 때 나의 첫 반응은?',
      en:'A friend says "I\'m feeling low today." Your first move?',
      ja:'友達が「今日ちょっと落ちてる」と言ったら?',
      zh:'朋友说“我今天有点低落”,你的第一反应?',
      es:'Un amigo dice "hoy estoy bajo". ¿Tu primera reacción?',
      fr:'Un ami dit « je broie du noir ». Ton premier réflexe ?',
      de:'Ein Freund sagt „mir geht\'s schlecht heute". Deine erste Reaktion?',
      vi:'Bạn nói "hôm nay mình hơi tệ". Phản ứng đầu?',
      th:'เพื่อนบอก "วันนี้รู้สึกแย่" — คุณทำอะไรก่อน?',
      pt:'Um amigo diz "hoje tô mal". Sua primeira reação?',
      hi:'दोस्त कहता है "आज उदास हूँ।" पहली प्रतिक्रिया?',
      ar:'صديق يقول "أشعر بضيق اليوم". رد فعلك الأول؟',
    },
    options: [
      { text: { ko:'"무슨 일 있어? 다 말해봐" 바로 통화 걸기', en:'"What happened? Tell me everything" — call right away', ja:'「どうしたの?全部聞く」すぐ電話', zh:'“怎么了?都说给我听”立刻打电话', es:'"¿Qué pasó? Cuéntame" — llamo ya', fr:'« Quoi ? Raconte » — j\'appelle direct', de:'"Was ist los? Erzähl" — rufe sofort an', vi:'"Có gì vậy? Kể hết đi" — gọi luôn', th:'"เป็นอะไร? เล่ามาให้หมด" — โทรเลย', pt:'"O que houve? Me conta" — ligo já', hi:'"क्या हुआ? सब बताओ" — तुरंत कॉल', ar:'"ماذا حدث؟ أخبرني" — أتصل فورًا' }, w:{W:1, E:1} },
      { text: { ko:'"그럴 수 있지. 나 여기 있어" 조용히 곁에 있어준다', en:'"That\'s okay. I\'m here." — just stay with them', ja:'「そういう日もあるよ。ここにいる」静かにそばに', zh:'“会这样的。我在”安静陪着', es:'"Está bien. Estoy aquí." — me quedo', fr:'« C\'est normal. Je suis là. » — je reste', de:'"Das ist okay. Ich bin da." — einfach bleiben', vi:'"Không sao. Mình ở đây." — ở bên', th:'"ไม่เป็นไร เราอยู่นี่" — อยู่ข้างๆ', pt:'"Tudo bem. Estou aqui." — fico junto', hi:'"ठीक है. मैं हूँ।" — पास रहता हूँ', ar:'"لا بأس. أنا هنا." — أبقى بجانبك' }, w:{W:1, E:-1} },
      { text: { ko:'"우리 뭐 먹으면서 풀자" 맛있는 거 사러 간다', en:'"Let\'s eat something good" — go get food', ja:'「美味しいもの食べて忘れよう」買いに行く', zh:'“我们吃点好的吧”带他去吃', es:'"Vamos a comer algo rico" — los saco', fr:'« On va manger un truc bon » — on sort', de:'"Lass uns gut essen gehen"', vi:'"Đi ăn gì ngon đi" — dẫn đi ăn', th:'"ไปกินอะไรอร่อยๆ กัน" — พาไปกิน', pt:'"Vamos comer algo bom" — saio com ele', hi:'"कुछ अच्छा खाएँ" — खाने ले जाता हूँ', ar:'"لنأكل شيئًا لذيذًا"' }, w:{W:1, F:1} },
      { text: { ko:'"내가 도울 수 있는 거 있어?" 실질적인 도움을 준다', en:'"Can I help with anything?" — offer real help', ja:'「何か手伝える?」実質的に助ける', zh:'“我能帮上什么?”给实际帮助', es:'"¿Puedo ayudar en algo?" — ayuda real', fr:'« Je peux aider ? » — aide concrète', de:'"Kann ich helfen?" — konkrete Hilfe', vi:'"Mình giúp gì được không?" — giúp thật', th:'"ให้ช่วยอะไรไหม?" — ช่วยจริงๆ', pt:'"Posso ajudar?" — ajuda real', hi:'"मैं क्या मदद करूँ?" — असली मदद', ar:'"هل أساعد بشيء؟" — مساعدة حقيقية' }, w:{S:1, C:1, W:1} },
    ],
  },
  {
    text: {
      ko:'단체 채팅방에서 안 읽은 메시지가 200개 쌓였어. 나는?',
      en:'200 unread messages in the group chat. What do you do?',
      ja:'グループチャットの未読が200件。どうする?',
      zh:'群聊未读200条,你会?',
      es:'200 mensajes sin leer en el grupo. ¿Qué haces?',
      fr:'200 messages non lus dans le groupe. Tu fais quoi ?',
      de:'200 ungelesene Nachrichten. Und jetzt?',
      vi:'200 tin chưa đọc trong nhóm. Bạn làm gì?',
      th:'ข้อความค้างอ่าน 200 ข้อความ ทำไง?',
      pt:'200 mensagens não lidas no grupo. E agora?',
      hi:'ग्रुप चैट में 200 अनपढ़ संदेश। क्या करेंगे?',
      ar:'200 رسالة غير مقروءة في المجموعة. ماذا تفعل؟',
    },
    options: [
      { text: { ko:'처음부터 다 읽는다. 무슨 일 있었는지 알아야 함', en:'Read every message from the start', ja:'最初から全部読む。何があったか知りたい', zh:'从头全部读完,得知道发生了什么', es:'Los leo todos desde el inicio', fr:'Je lis tout depuis le début', de:'Lese alles von Anfang an', vi:'Đọc hết từ đầu', th:'อ่านหมดตั้งแต่ต้น', pt:'Leio tudo desde o começo', hi:'शुरू से सब पढ़ता हूँ', ar:'أقرأها كلها من البداية' }, w:{C:1, S:1} },
      { text: { ko:'마지막 10개만 보고 눈치껏 파악', en:'Just the last 10 — I\'ll catch the vibe', ja:'最後の10件だけ見て雰囲気で察する', zh:'只看最后10条,自己领会', es:'Solo los últimos 10 y capto la onda', fr:'Juste les 10 derniers, je capte', de:'Nur die letzten 10 — ich kapiere den Ton', vi:'Chỉ 10 tin cuối, tự hiểu', th:'ดูแค่ 10 ข้อความท้าย', pt:'Só as 10 últimas — pego o clima', hi:'बस आखिरी 10 — माहौल समझ लेता हूँ', ar:'آخر 10 فقط — سأفهم الجو' }, w:{F:1, E:0} },
      { text: { ko:'"ㅋㅋㅋㅋ" 치고 위로 스크롤', en:'Drop a "lol" and scroll back', ja:'「www」と送って上にスクロール', zh:'发个“哈哈哈”再往上翻', es:'Mando un "jaja" y subo', fr:'Je lâche un « mdr » et je remonte', de:'Schreibe "lol" und scrolle hoch', vi:'Thả "haha" rồi cuộn lên', th:'พิมพ์ "5555" แล้วเลื่อนขึ้น', pt:'Mando um "kkk" e subo', hi:'"lol" भेजकर ऊपर स्क्रॉल', ar:'أكتب "هههه" وأصعد' }, w:{E:1, F:1} },
      { text: { ko:'답장 안 하고 조용히 나간다', en:'Silently leave it on read', ja:'返信せずそっと既読スルー', zh:'不回,悄悄已读', es:'Lo dejo en visto, en silencio', fr:'Je laisse en vu, discrètement', de:'Still auf gelesen lassen', vi:'Để đã đọc rồi im lặng', th:'ปล่อยไว้อ่านแล้วเงียบ', pt:'Deixo no visto, em silêncio', hi:'चुपचाप पढ़ा हुआ छोड़ देता हूँ', ar:'أتركه مقروءًا بصمت' }, w:{E:-1, F:1} },
    ],
  },
  {
    text: {
      ko:'처음 보는 사람들 사이에서 나는?',
      en:'Among a group of strangers, you...',
      ja:'初対面の集まりで、私は?',
      zh:'在一群陌生人中,你会?',
      es:'Entre desconocidos, tú...',
      fr:'Parmi des inconnus, tu...',
      de:'Unter Fremden...',
      vi:'Giữa người lạ, bạn...',
      th:'อยู่ในกลุ่มคนแปลกหน้า คุณ...',
      pt:'Entre desconhecidos, você...',
      hi:'अनजान लोगों के बीच, आप...',
      ar:'بين الغرباء، أنت...',
    },
    options: [
      { text: { ko:'먼저 다가가서 말을 건다', en:'Walk up and start a conversation', ja:'自分から話しかける', zh:'主动走过去搭话', es:'Me acerco y empiezo a hablar', fr:'Je vais parler en premier', de:'Gehe hin und spreche an', vi:'Chủ động bắt chuyện', th:'เข้าไปทักก่อน', pt:'Chego e puxo assunto', hi:'जाकर बात शुरू करता हूँ', ar:'أقترب وأبدأ الحديث' }, w:{E:1, F:1} },
      { text: { ko:'누가 말 걸어올 때까지 기다린다', en:'Wait for someone to approach me', ja:'誰かが話しかけてくるのを待つ', zh:'等别人来搭话', es:'Espero a que alguien se acerque', fr:'J\'attends qu\'on vienne vers moi', de:'Warte, bis jemand kommt', vi:'Đợi ai đó bắt chuyện', th:'รอให้มีคนเข้ามาหา', pt:'Espero alguém chegar', hi:'किसी के आने का इंतज़ार', ar:'أنتظر من يبادر' }, w:{E:-1, S:1} },
      { text: { ko:'옆에 있는 사람에게 조용히 인사한다', en:'Quietly say hi to whoever\'s next to me', ja:'隣の人に静かに挨拶する', zh:'轻轻跟旁边的人打招呼', es:'Saludo bajito a quien esté al lado', fr:'Je salue discrètement mon voisin', de:'Begrüße leise meinen Nachbarn', vi:'Chào nhẹ người bên cạnh', th:'ทักคนข้างๆ เบาๆ', pt:'Cumprimento baixinho quem está ao lado', hi:'पास वाले को चुपचाप हाय', ar:'أحيّي من بجانبي بهدوء' }, w:{W:1, E:0} },
      { text: { ko:'사람들 관찰하면서 누가 제일 재밌을지 찾는다', en:'Observe everyone — find who seems most fun', ja:'みんなを観察して誰が一番面白いか探す', zh:'观察大家,找谁最有趣', es:'Observo y busco al más divertido', fr:'J\'observe et repère le plus drôle', de:'Beobachte alle — wer ist am lustigsten?', vi:'Quan sát xem ai vui nhất', th:'สังเกตหาว่าใครสนุกสุด', pt:'Observo e acho o mais divertido', hi:'देखकर पता लगाता हूँ कौन मज़ेदार', ar:'أراقب لأجد الأكثر تسلية' }, w:{C:1, E:-1} },
    ],
  },
  {
    text: {
      ko:'친구가 "나 이번에 큰 결정 앞두고 있어" 라고 하면?',
      en:'A friend says "I have a big decision coming up."',
      ja:'友達が「大きい決断を控えてる」と言ったら?',
      zh:'朋友说“我面临一个大决定”时?',
      es:'Un amigo dice "tengo una gran decisión".',
      fr:'Un ami dit « j\'ai une grande décision à prendre ».',
      de:'Ein Freund sagt „ich stehe vor einer großen Entscheidung".',
      vi:'Bạn nói "mình sắp có quyết định lớn".',
      th:'เพื่อนบอก "กำลังจะตัดสินใจเรื่องใหญ่"',
      pt:'Um amigo diz "tenho uma grande decisão".',
      hi:'दोस्त कहता है "बड़ा फैसला करना है"।',
      ar:'صديق يقول "أمامي قرار كبير".',
    },
    options: [
      { text: { ko:'"장단점 정리해줄게" 표를 그려준다', en:'"Let me lay out the pros and cons"', ja:'「メリット・デメリット整理するね」表を書く', zh:'“我帮你列优缺点”画个表', es:'"Te hago pros y contras"', fr:'« Je te fais le pour et le contre »', de:'"Ich liste Vor- und Nachteile"', vi:'"Mình liệt kê ưu nhược điểm nhé"', th:'"เดี๋ยวทำข้อดีข้อเสียให้"', pt:'"Vou listar prós e contras"', hi:'"फायदे-नुकसान लिखता हूँ"', ar:'"سأرتب الإيجابيات والسلبيات"' }, w:{C:1, S:1} },
      { text: { ko:'"네가 하고 싶은 게 뭔데?" 마음을 먼저 물어본다', en:'"What do YOU actually want?"', ja:'「本当はどうしたいの?」気持ちを先に聞く', zh:'“你自己想怎样?”先问心意', es:'"¿Qué quieres TÚ?"', fr:'« Toi, tu veux quoi ? »', de:'"Was willst DU?"', vi:'"Bản thân bạn muốn gì?"', th:'"ตัวเธออยากได้อะไร?"', pt:'"O que VOCÊ quer?"', hi:'"तुम खुद क्या चाहते हो?"', ar:'"ماذا تريد أنت؟"' }, w:{W:1, C:1} },
      { text: { ko:'"일단 해보고 아니면 바꾸면 되지!"', en:'"Just try it — you can change later!"', ja:'「とりあえずやってみて、違ったら変えればいい!」', zh:'“先试试,不行再改!”', es:'"¡Inténtalo y si no, cambias!"', fr:'« Essaie, tu changer as après ! »', de:'"Probier\'s — ändern kannst du später!"', vi:'"Cứ thử đi, đổi được mà!"', th:'"ลองเลย ไม่ได้ก็เปลี่ยน!"', pt:'"Tenta — dá pra mudar depois!"', hi:'"करके देखो, बदल सकते हो!"', ar:'"جرّب — يمكنك التغيير لاحقًا!"' }, w:{F:1, E:1} },
      { text: { ko:'"무조건 네 편이야. 결정은 네가 해"', en:'"I\'m with you no matter what. It\'s your call."', ja:'「絶対に味方だよ。決めるのはあなた」', zh:'“我永远站你这边,决定你来”', es:'"Estoy contigo. Tú decides."', fr:'« Je te soutiens. C\'est ton choix. »', de:'"Ich bin bei dir. Du entscheidest."', vi:'"Mình luôn bên bạn. Bạn quyết."', th:'"อยู่ข้างเธอเสมอ เธอเลือกเอง"', pt:'"Estou com você. A escolha é sua."', hi:'"मैं साथ हूँ। फैसला तुम्हारा।"', ar:'"أنا معك. القرار قرارك."' }, w:{W:1, S:1, C:0} },
    ],
  },
  {
    text: {
      ko:'내 방(또는 내 자리)은 어떤 상태야?',
      en:'What does your room (or desk) look like?',
      ja:'自分の部屋(または机)はどんな状態?',
      zh:'你的房间(或桌子)是什么状态?',
      es:'¿Cómo está tu cuarto (o escritorio)?',
      fr:'Ta chambre (ou ton bureau), c\'est comment ?',
      de:'Wie sieht dein Zimmer (oder Schreibtisch) aus?',
      vi:'Phòng (hoặc bàn) của bạn thế nào?',
      th:'ห้อง (หรือโต๊ะ) ของคุณเป็นยังไง?',
      pt:'Como está seu quarto (ou mesa)?',
      hi:'आपका कमरा (या डेस्क) कैसा है?',
      ar:'كيف تبدو غرفتك (أو مكتبك)؟',
    },
    options: [
      { text: { ko:'정리 정돈 완벽. 물건마다 자리가 있음', en:'Perfectly organized — everything has a spot', ja:'完璧に整理整頓。物ごとに場所がある', zh:'完美整理,每样东西都有固定位置', es:'Perfectamente ordenado, todo tiene su lugar', fr:'Parfaitement rangé, chaque chose à sa place', de:'Perfekt sortiert — alles hat seinen Platz', vi:'Ngăn nắp hoàn hảo, mọi thứ có chỗ', th:'เป็นระเบียบ ทุกอย่างมีที่ของมัน', pt:'Organizado, tudo tem seu lugar', hi:'बिल्कुल व्यवस्थित, हर चीज़ की जगह', ar:'منظّم تمامًا، لكل شيء مكان' }, w:{S:1, F:-1} },
      { text: { ko:'어질러져 있지만 내가 어디 있는지는 다 알아', en:'Messy — but I know exactly where everything is', ja:'散らかってるけど、どこに何があるかは分かる', zh:'乱,但我知道每样东西在哪', es:'Desordenado, pero sé dónde está todo', fr:'En bazar, mais je sais où est tout', de:'Unordentlich — ich weiß aber, wo alles ist', vi:'Bừa nhưng mình biết mọi thứ ở đâu', th:'รก แต่รู้ว่าอะไรอยู่ไหน', pt:'Bagunçado, mas sei onde está tudo', hi:'बिखरा है पर सब पता है', ar:'فوضوي لكن أعرف مكان كل شيء' }, w:{F:1, S:0} },
      { text: { ko:'내 취향 물건들로 가득. 나만의 공간', en:'Full of things I love — my own little world', ja:'好きなものでいっぱい。自分だけの空間', zh:'摆满喜欢的东西,我的小天地', es:'Lleno de cosas que amo, mi mundo', fr:'Plein de ce que j\'aime, mon petit monde', de:'Voll mit Dingen, die ich liebe', vi:'Đầy thứ mình thích — thế giới riêng', th:'เต็มไปด้วยของที่ชอบ — โลกส่วนตัว', pt:'Cheio do que amo — meu mundinho', hi:'पसंदीदा चीज़ों से भरा, मेरी दुनिया', ar:'مليء بما أحب — عالمي الصغير' }, w:{C:1, F:1, S:-0.5} },
      { text: { ko:'최소한만 있음. 필요한 것만 두는 편', en:'Minimal — only the essentials', ja:'最小限。必要なものだけ置く', zh:'极简,只放必要的', es:'Mínimo, solo lo esencial', fr:'Minimal, juste l\'essentiel', de:'Minimal — nur das Nötigste', vi:'Tối giản, chỉ đồ cần thiết', th:'มินิมอล แค่ของจำเป็น', pt:'Minimalista, só o essencial', hi:'कम से कम, बस ज़रूरी चीज़ें', ar:'بسيط — الضروري فقط' }, w:{S:1, F:-1, C:-1} },
    ],
  },
  {
    text: {
      ko:'새로운 걸 배울 때 나는?',
      en:'When you learn something new, you...',
      ja:'新しいことを学ぶとき、私は?',
      zh:'学新东西时,你会?',
      es:'Cuando aprendes algo nuevo, tú...',
      fr:'Quand tu apprends un truc nouveau, tu...',
      de:'Wenn du etwas Neues lernst...',
      vi:'Khi học điều mới, bạn...',
      th:'เวลาเรียนสิ่งใหม่ คุณ...',
      pt:'Ao aprender algo novo, você...',
      hi:'नया कुछ सीखते समय, आप...',
      ar:'عند تعلّم شيء جديد، أنت...',
    },
    options: [
      { text: { ko:'일단 해본다. 부딪히면서 배움', en:'Just try it — learn by doing', ja:'とりあえずやってみる。実践で覚える', zh:'先动手做,边做边学', es:'Lo intento — aprendo haciendo', fr:'J\'essaie direct — j\'apprends en faisant', de:'Einfach machen — learning by doing', vi:'Cứ thử — học bằng làm', th:'ลองเลย — เรียนจากการทำ', pt:'Tento — aprendo fazendo', hi:'करके देखता हूँ — करते हुए सीखता हूँ', ar:'أجرّب مباشرة — أتعلم بالممارسة' }, w:{F:1, E:1, C:0} },
      { text: { ko:'이론부터 차근차근. 기초가 중요해', en:'Theory first, step by step — basics matter', ja:'理論から順番に。基礎が大事', zh:'从理论开始一步步来,基础重要', es:'Teoría primero, paso a paso', fr:'La théorie d\'abord, étape par étape', de:'Erst Theorie, Schritt für Schritt', vi:'Lý thuyết trước, từng bước', th:'ทฤษฎีก่อน ทีละขั้น', pt:'Teoria primeiro, passo a passo', hi:'पहले सिद्धांत, कदम-दर-कदम', ar:'النظرية أولاً، خطوة بخطوة' }, w:{S:1, C:1, F:-1} },
      { text: { ko:'누군가에게 물어본다. 같이 배우면 빨라', en:'Ask someone — learning together is faster', ja:'誰かに聞く。一緒に学ぶと早い', zh:'问别人,一起学更快', es:'Pregunto a alguien — aprendo más rápido', fr:'Je demande à quelqu\'un — plus rapide', de:'Frage jemanden — zusammen geht\'s schneller', vi:'Hỏi ai đó — học cùng nhanh hơn', th:'ถามคนอื่น — เรียนด้วยกันเร็ว', pt:'Pergunto alguém — junto é mais rápido', hi:'किसी से पूछता हूँ — साथ में जल्दी', ar:'أسأل أحدًا — التعلم معًا أسرع' }, w:{E:1, W:1} },
      { text: { ko:'혼자 조용히 파본다. 내 속도대로', en:'Dig into it alone — at my own pace', ja:'一人で静かに掘り下げる。自分のペースで', zh:'自己安静研究,按我的节奏', es:'Lo investigo solo, a mi ritmo', fr:'Je creuse seul, à mon rythme', de:'Vertiefe es allein — in meinem Tempo', vi:'Tự tìm hiểu, theo nhịp riêng', th:'ขุดคนเดียว ตามจังหวะตัวเอง', pt:'Mergulho sozinho, no meu ritmo', hi:'अकेले खोजता हूँ, अपनी रफ़्तार', ar:'أغوص فيه وحدي — بوتيرتي' }, w:{C:1, E:-1} },
    ],
  },
  {
    text: {
      ko:'마지막! 10년 뒤 내 모습으로 가장 끌리는 건?',
      en:'Last one! Which version of you in 10 years pulls you most?',
      ja:'最後! 10年後の自分で一番惹かれるのは?',
      zh:'最后! 十年后的你,最吸引你的是?',
      es:'¡Última! ¿Qué versión tuya en 10 años te atrae más?',
      fr:'Dernière ! Quelle version de toi dans 10 ans t\'attire ?',
      de:'Letzte! Welche Version von dir in 10 Jahren reizt dich?',
      vi:'Cuối! Bạn của 10 năm sau nào hấp dẫn nhất?',
      th:'ข้อสุดท้าย! ตัวคุณในอีก 10 ปีแบบไหนที่ใช่?',
      pt:'Última! Qual você em 10 anos te atrai mais?',
      hi:'आखिरी! 10 साल बाद का कौन-सा रूप पसंद है?',
      ar:'الأخير! أي نسخة منك بعد 10 سنوات تجذبك؟',
    },
    options: [
      { text: { ko:'세계 여러 나라를 다니며 살고 있다', en:'Living across different countries', ja:'世界中を回りながら暮らしている', zh:'在各国之间生活', es:'Viviendo en varios países', fr:'Vivant dans plusieurs pays', de:'Lebe in verschiedenen Ländern', vi:'Sống ở nhiều nước', th:'ใช้ชีวิตในหลายประเทศ', pt:'Morando em vários países', hi:'कई देशों में रह रहा हूँ', ar:'أعيش في بلدان مختلفة' }, w:{F:1, C:1, E:0} },
      { text: { ko:'내 분야에서 알아주는 전문가가 되어 있다', en:'A respected expert in my field', ja:'自分の分野で認められる専門家になっている', zh:'在自己领域成为被认可的专业人士', es:'Un experto respetado en mi campo', fr:'Un expert reconnu dans mon domaine', de:'Ein angesehener Experte in meinem Feld', vi:'Chuyên gia được công nhận', th:'ผู้เชี่ยวชาญที่ได้รับการยอมรับ', pt:'Um especialista respeitado', hi:'अपने क्षेत्र का प्रतिष्ठित विशेषज्ञ', ar:'خبير معترف به في مجالي' }, w:{S:1, C:1, F:-1} },
      { text: { ko:'소중한 사람들과 깊은 관계를 유지하고 있다', en:'Keeping deep bonds with people I love', ja:'大切な人たちと深い関係を保っている', zh:'和重要的人保持深厚关系', es:'Manteniendo lazos profundos con los míos', fr:'Gardant des liens profonds avec mes proches', de:'Tiefe Verbindungen zu meinen Menschen', vi:'Giữ mối quan hệ sâu sắc với người thân', th:'รักษาความสัมพันธ์ลึกซึ้งกับคนสำคัญ', pt:'Mantendo laços profundos com quem amo', hi:'अपनों से गहरा रिश्ता बनाए हूँ', ar:'أحافظ على روابط عميقة بأحبّتي' }, w:{W:1, S:1} },
      { text: { ko:'내가 만든 무언가로 사람들에게 영향을 주고 있다', en:'Making an impact through something I created', ja:'自分が作った何かで人に影響を与えている', zh:'用我创造的东西影响他人', es:'Impactando con algo que creé', fr:'Ayant un impact grâce à ce que j\'ai créé', de:'Wirkung durch etwas, das ich erschaffen habe', vi:'Tạo ảnh hưởng bằng thứ mình làm ra', th:'สร้างผลกระทบจากสิ่งที่ตัวเองสร้าง', pt:'Impactando com algo que criei', hi:'अपनी बनाई चीज़ से प्रभाव डाल रहा हूँ', ar:'أؤثر في الناس بشيء صنعته' }, w:{F:1, E:1, C:1} },
    ],
  },
];

// ─── 5축 점수 계산 ──────────────────────────────
// 각 선택지는 {E,W,C,F,S} 에 +1/-1 을 기여. 축별로 평균을 내서 0..1 로 정규화한 뒤,
// 유형별 이상 시그니처와의 유클리드 거리를 비교해 가장 가까운 유형을 찾아요.
// z-정규화로 무작위 응답 시 편향이 사라지고, 약간의 지터로 동점을 자연스럽게 처리합니다.

function computePersonalityV3(answers) {
  const AX = ['E','W','C','F','S'];

  // 1) 축별 기대값 (무작위 응답 시 평균) 과 분산을 사전 계산
  const mean = {}; const variance = {};
  AX.forEach(a => { mean[a] = 0; variance[a] = 0; });

  PQ3.forEach((q) => {
    AX.forEach((ax) => {
      const vals = q.options.map(o => (o.w && o.w[ax]) || 0);
      const k = vals.length;
      const m = vals.reduce((s, v) => s + v, 0) / k;
      const v = vals.reduce((s, x) => s + x*x, 0) / k - m*m;
      mean[ax] += m;
      variance[ax] += Math.max(0, v);
    });
  });

  // 2) 실제 응답 합산
  const raw = {}; AX.forEach(a => raw[a] = 0);

  answers.forEach((ans, i) => {
    let qi = i, oi = ans;
    if (ans && typeof ans === 'object') { qi = ans.origQ; oi = ans.origO; }
    const q = PQ3[qi];
    if (!q) return;
    const picked = q.options[oi];
    if (!picked || !picked.w) return;
    AX.forEach(a => { raw[a] += (picked.w[a] || 0); });
  });

  // 3) z-score 로 축 프로파일 만들기 (0 중심)
  const z = {};
  AX.forEach((a) => {
    const sd = Math.sqrt(variance[a]) || 1;
    z[a] = (raw[a] - mean[a]) / sd;
  });

  // 4) 각 유형의 시그니처도 같은 방식으로 z 변환하기 위해
  //    시그니처 값(0..1)을 -1..1 로 옮겨 비교
  const toZ = (v) => (v - 0.5) * 2;  // 0..1 → -1..1

  let bestKey = null;
  let bestScore = -Infinity;
  Object.values(window.P_TYPES_V3).forEach((t) => {
    let d = 0;
    AX.forEach((a) => {
      const sig = toZ(t.sig[a] != null ? t.sig[a] : 0.5);
      const diff = z[a] - sig;
      d += diff * diff;
    });
    // 가까울수록 좋음 + 작은 지터로 동점 랜덤화
    const score = -d + Math.random() * 0.35;
    if (score > bestScore) { bestScore = score; bestKey = t.key; }
  });

  return window.P_TYPES_V3[bestKey] || window.P_TYPES_V3.BRIDGE;
}

window.PERSONALITY_QUESTIONS_V2 = PQ3;
window.computePersonality = computePersonalityV3;
