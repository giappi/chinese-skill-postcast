
INSERT INTO entry (EID, CID, CATN, CATT, LVLT, ST, TT, TRE, TRJ, TRK)
VALUES
(140, 857, 'SHOPPING', 15, 3, '请问，更衣室在哪里？', '請問，更衣室在哪里？', 'Excuse me， where is the changing room?', 'すみません、更衣室はどこですか。', 'undefined');
    

INSERT INTO sentence (SID, EID, STRE, STRJ, STRK) VALUES
    (0, 140, 'undefined', 'undefined', 'undefined'),
    (1, 140, 'Hello， excuse me， where is the changing room?', 'すみませんが、あのー，更衣室はどこですか。', 'undefined'),
    (2, 140, 'Go ahead. Turn right. There is changing room for women. Turn left. there is changing room for men.', 'まっすぐ行って、右に曲がると女子更衣室で、左に曲がると男子更衣室です。', 'undefined'),
    (3, 140, 'Excuse me， Is there towel in the changing room?', 'みません、更衣室にはタオルがありますか。', 'undefined'),
    (4, 140, 'No. But there are towels in service counter.', 'いいえ。でもサービスカウンターにはタオルがあります。', 'undefined'),
    (5, 140, 'Thank you!', 'どうもありがとう！', 'undefined');

INSERT INTO word (WID, SW, TW, PY, EN, JP, KR, KW) VALUES
    (1400001, 'A', 'A', '', '', '', 'undefined', 'N'),
    (1400002, '：', '：', '', '', '', 'undefined', 'N'),
    (1400003, '你好', '你好', 'nǐhǎo', 'hello', 'こんにちは', 'undefined', 'N'),
    (1400004, '，', '，', '', '', '', 'undefined', 'N'),
    (1400005, '请问', '請問', 'qǐngwèn', 'Excuse me', 'すみません', 'undefined', 'N'),
    (1400006, '，', '，', '', '', '', 'undefined', 'N'),
    (1400007, '更衣室', '更衣室', 'gēngyīshì', 'dressing room', '更衣室', 'undefined', 'Y'),
    (1400008, '在', '在', 'zài', 'be/is', 'ある;いる', 'undefined', 'N'),
    (1400009, '哪里', '哪里', 'nǎlǐ', 'where', 'どこ', 'undefined', 'N'),
    (1400010, '？', '？', '', '', '', 'undefined', 'N');

INSERT INTO sentences_words (SID, WID) VALUES
(1, 0),
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10);

INSERT INTO word (WID, SW, TW, PY, EN, JP, KR, KW) VALUES
    (1400011, 'B', 'B', '', '', '', 'undefined', 'N'),
    (1400012, '：', '：', '', '', '', 'undefined', 'N'),
    (1400013, '直走', '直走', 'zhízǒu', 'walk straight', 'まっすぐ行って', 'undefined', 'Y'),
    (1400014, '，', '，', '', '', '', 'undefined', 'N'),
    (1400015, '右拐', '右拐', 'yòuguǎi', 'turn right', '右に曲がる', 'undefined', 'Y'),
    (1400016, '是', '是', 'shì', 'be', 'だ，である', 'undefined', 'N'),
    (1400017, '女', '女', 'nǚ', 'female', '女性', 'undefined', 'Y'),
    (1400018, '更衣室', '更衣室', 'gēngyīshì', 'dressing room', '更衣室', 'undefined', 'Y'),
    (1400019, '，', '，', '', '', '', 'undefined', 'N'),
    (1400020, '左拐', '左拐', 'zuǒguǎi', 'turn left', '左に曲がる', 'undefined', 'Y'),
    (1400021, '是', '是', 'shì', 'be', 'は', 'undefined', 'N'),
    (1400022, '男', '男', 'nán', 'male', '男', 'undefined', 'N'),
    (1400023, '更衣室', '更衣室', 'gēngyīshì', 'dressing room', '更衣室', 'undefined', 'Y'),
    (1400024, '。', '。', '', '', '', 'undefined', 'N');

INSERT INTO sentences_words (SID, WID) VALUES
(2, 0),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14);

INSERT INTO word (WID, SW, TW, PY, EN, JP, KR, KW) VALUES
    (1400025, 'A', 'A', '', '', '', 'undefined', 'N'),
    (1400026, '：', '：', '', '', '', 'undefined', 'N'),
    (1400027, '请问', '請問', 'qǐngwèn', 'Excuse me', 'すみません', 'undefined', 'N'),
    (1400028, '，', '，', '', '', '', 'undefined', 'N'),
    (1400029, '更衣室', '更衣室', 'gēngyīshì', 'dressing room', '更衣室', 'undefined', 'Y'),
    (1400030, '里', '里', 'lǐ', 'in', '中;内部', 'undefined', 'N'),
    (1400031, '有', '有', 'yǒu', 'have; there be', 'ある;いる;持つ', 'undefined', 'Y'),
    (1400032, '浴巾', '浴巾', 'yùjīn', 'bath towel', 'バスタオル', 'undefined', 'Y'),
    (1400033, '吗', '嗎', 'ma', 'question marker', '文末で問いかけを表す', 'undefined', 'N'),
    (1400034, '？', '？', '', '', '', 'undefined', 'N');

INSERT INTO sentences_words (SID, WID) VALUES
(3, 0),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(3, 10);

INSERT INTO word (WID, SW, TW, PY, EN, JP, KR, KW) VALUES
    (1400035, 'B', 'B', '', '', '', 'undefined', 'N'),
    (1400036, '：', '：', '', '', '', 'undefined', 'N'),
    (1400037, '没有', '沒有', 'méiyǒu', 'no', '否定を表す', 'undefined', 'N'),
    (1400038, '，', '，', '', '', '', 'undefined', 'N'),
    (1400039, '服务台', '服務臺', 'fúwùtái', '(at) front desk', 'フロント', 'undefined', 'Y'),
    (1400040, '有', '有', 'yǒu', 'have， there be', 'ある;いる;持つ', 'undefined', 'Y'),
    (1400041, '浴巾', '浴巾', 'yùjīn', 'bath towel', 'バスタオル', 'undefined', 'Y'),
    (1400042, '。', '。', '', '', '', 'undefined', 'N');

INSERT INTO sentences_words (SID, WID) VALUES
(4, 0),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8);

INSERT INTO word (WID, SW, TW, PY, EN, JP, KR, KW) VALUES
    (1400043, 'A', 'A', '', '', '', 'undefined', 'N'),
    (1400044, '：', '：', '', '', '', 'undefined', 'N'),
    (1400045, '谢谢', '謝謝', 'xièxie', 'thank you', 'ありがとうございます', 'undefined', 'N'),
    (1400046, '！', '！', '', '', '', 'undefined', 'N');

INSERT INTO sentences_words (SID, WID) VALUES
(5, 0),
(5, 1),
(5, 2),
(5, 3),
(5, 4);

