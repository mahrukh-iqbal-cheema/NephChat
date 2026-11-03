// Initial content carried over from the prototype. After seeding, edit it through the admin portal.

type Stage = "CKD3" | "CKD4" | "CKD5" | "ESRD";
type Level = "H" | "L";

export type SeedArticle = {
  slug: string;
  icon: string;
  titleEn: string;
  titleUr: string;
  bodyEn: string[];
  bodyUr: string[];
};

export type SeedFood = {
  slug: string;
  nameEn: string;
  nameUr: string;
  category: "FRUITS" | "VEGETABLES" | "DRY_FRUITS" | "GRAINS" | "DAIRY" | "PROTEIN" | "OTHER";
  portions?: Record<Stage, string>;
  potassium?: Level;
  phosphorus?: Level;
  sodium?: Level;
  vegetarian?: boolean;
  meals?: ("BREAKFAST" | "LUNCH" | "DINNER" | "SNACK")[];
  mealExclude?: boolean;
};

const all = (v: string): Record<Stage, string> => ({ CKD3: v, CKD4: v, CKD5: v, ESRD: v });
const p = (CKD3: string, CKD4: string, CKD5: string, ESRD: string): Record<Stage, string> => ({ CKD3, CKD4, CKD5, ESRD });
const NORMAL = "Allowed in normal amount";

export const ARTICLES: SeedArticle[] = [
  {
    slug: "kidneys", icon: "bean", titleEn: "What do kidneys do?", titleUr: "گردے کیا کام کرتے ہیں؟",
    bodyEn: [
      "Your kidneys are two bean-shaped organs, roughly the size of a fist, sitting below your rib cage on each side of your spine.",
      "They filter waste and extra fluid out of your blood, which leaves your body as urine. They also help control blood pressure, keep bone and blood healthy, and balance minerals like sodium and potassium.",
      "Because they quietly do this work every day, kidney problems can develop gradually without early symptoms — which is why checks like eGFR and urine tests matter.",
    ],
    bodyUr: [
      "آپ کے گردے دو پھلی نما اعضاء ہیں، تقریباً مٹھی کے برابر، جو پسلیوں کے نیچے ریڑھ کی ہڈی کے دونوں طرف واقع ہوتے ہیں۔",
      "یہ خون سے فاضل مادے اور اضافی پانی کو چھانتے ہیں، جو پیشاب کی صورت میں جسم سے خارج ہوتا ہے۔ یہ بلڈ پریشر کو کنٹرول کرنے، ہڈیوں اور خون کو صحت مند رکھنے، اور سوڈیم اور پوٹاشیم جیسے معدنیات کا توازن برقرار رکھنے میں بھی مدد کرتے ہیں۔",
      "چونکہ یہ کام خاموشی سے روزانہ ہوتا رہتا ہے، اس لیے گردوں کے مسائل ابتدائی علامات کے بغیر آہستہ آہستہ پیدا ہو سکتے ہیں — اسی لیے eGFR اور یورین ٹیسٹ جیسے چیک اپ اہم ہیں۔",
    ],
  },
  {
    slug: "ckd", icon: "droplet", titleEn: "What is CKD?", titleUr: "CKD کیا ہے؟",
    bodyEn: [
      "CKD stands for Chronic Kidney Disease — a gradual, long-term loss of kidney function.",
      "It's usually identified using two things together: eGFR (how well your kidneys filter blood) and urine ACR (whether protein is leaking into your urine). A single low reading isn't enough on its own — doctors generally look for these changes to persist for three months or more.",
      "CKD is common, often has no early symptoms, and is frequently caused or worsened by diabetes and high blood pressure — which is why controlling both is central to protecting your kidneys.",
    ],
    bodyUr: [
      "CKD کا مطلب ہے دائمی گردوں کی بیماری — گردوں کے کام کرنے کی صلاحیت کا آہستہ آہستہ، طویل مدتی نقصان۔",
      "اس کی شناخت عام طور پر دو چیزوں سے کی جاتی ہے: eGFR (گردے خون کو کتنی اچھی طرح چھانتے ہیں) اور یورین ACR (کیا پروٹین پیشاب میں خارج ہو رہا ہے)۔ صرف ایک کم ریڈنگ کافی نہیں ہوتی — ڈاکٹر عام طور پر دیکھتے ہیں کہ یہ تبدیلیاں کم از کم تین ماہ تک برقرار رہیں۔",
      "CKD عام بیماری ہے، اکثر ابتدائی علامات ظاہر نہیں کرتی، اور اکثر ذیابیطس اور ہائی بلڈ پریشر کی وجہ سے ہوتی یا بگڑتی ہے — اسی لیے دونوں کو کنٹرول کرنا گردوں کی حفاظت میں مرکزی حیثیت رکھتا ہے۔",
    ],
  },
  {
    slug: "egfr", icon: "calculator", titleEn: "What does eGFR mean?", titleUr: "eGFR کا کیا مطلب ہے؟",
    bodyEn: [
      "eGFR stands for estimated Glomerular Filtration Rate — an estimate of how much blood your kidneys filter each minute.",
      "It's calculated from a blood test (creatinine), along with your age and sex, using a standard formula (the 2021 CKD-EPI equation).",
      "A higher number generally reflects better-functioning kidneys, but eGFR naturally varies with muscle mass, hydration, and lab differences. One result is a snapshot, not the full picture — it's interpreted together with urine ACR and past results.",
    ],
    bodyUr: [
      "eGFR کا مطلب ہے تخمینی گلومیرولر فلٹریشن ریٹ — یہ اندازہ ہے کہ آپ کے گردے ہر منٹ میں کتنا خون چھانتے ہیں۔",
      "یہ ایک بلڈ ٹیسٹ (کریٹینین)، آپ کی عمر اور جنس کی بنیاد پر ایک معیاری فارمولے (2021 CKD-EPI equation) سے حساب کیا جاتا ہے۔",
      "زیادہ نمبر عام طور پر بہتر کام کرنے والے گردوں کی نشاندہی کرتا ہے، لیکن eGFR پٹھوں کی مقدار، پانی کی کمی اور لیب کے فرق کے ساتھ قدرتی طور پر تبدیل ہو سکتا ہے۔ ایک نتیجہ صرف ایک جھلک ہے، مکمل تصویر نہیں — اسے یورین ACR اور پچھلے نتائج کے ساتھ ملا کر دیکھا جاتا ہے۔",
    ],
  },
  {
    slug: "acr", icon: "flask", titleEn: "What is urine ACR?", titleUr: "یورین ACR کیا ہے؟",
    bodyEn: [
      "ACR stands for Albumin-to-Creatinine Ratio — a urine test that checks whether albumin (a protein) is leaking into your urine.",
      "Healthy kidneys normally keep albumin in the blood. When the kidneys' filters are damaged, albumin can leak through, even before eGFR drops.",
      "This makes ACR an early and important companion test to eGFR — checking both gives a much fuller picture of kidney health than either alone.",
    ],
    bodyUr: [
      "ACR کا مطلب ہے البیومن ٹو کریٹینین ریشو — ایک یورین ٹیسٹ جو یہ چیک کرتا ہے کہ کیا البیومن (ایک پروٹین) پیشاب میں خارج ہو رہا ہے۔",
      "صحت مند گردے عام طور پر البیومن کو خون میں محفوظ رکھتے ہیں۔ جب گردوں کے فلٹرز کو نقصان پہنچتا ہے تو البیومن پیشاب میں لیک ہو سکتا ہے، یہاں تک کہ eGFR کم ہونے سے پہلے بھی۔",
      "اسی لیے ACR، eGFR کے ساتھ ایک اہم اور ابتدائی ٹیسٹ ہے — دونوں کو چیک کرنے سے گردوں کی صحت کی زیادہ مکمل تصویر ملتی ہے۔",
    ],
  },
  {
    slug: "creatinine", icon: "test-tube", titleEn: "What does creatinine mean?", titleUr: "کریٹینین کا کیا مطلب ہے؟",
    bodyEn: [
      "Creatinine is a waste product made by your muscles, which healthy kidneys filter out of your blood.",
      "When kidney function drops, creatinine builds up in the blood, so a blood creatinine test is used, together with age and sex, to estimate eGFR.",
      "Creatinine levels can also shift with muscle mass, diet, dehydration, or certain medicines, which is one reason results are reviewed by a professional rather than read in isolation.",
    ],
    bodyUr: [
      "کریٹینین ایک فاضل مادہ ہے جو آپ کے پٹھے بناتے ہیں، جسے صحت مند گردے خون سے چھانتے ہیں۔",
      "جب گردوں کا کام کم ہوتا ہے تو کریٹینین خون میں جمع ہونے لگتا ہے، اس لیے بلڈ کریٹینین ٹیسٹ کو عمر اور جنس کے ساتھ ملا کر eGFR کا اندازہ لگانے کے لیے استعمال کیا جاتا ہے۔",
      "کریٹینین کی سطح پٹھوں کی مقدار، خوراک، پانی کی کمی یا بعض ادویات سے بھی تبدیل ہو سکتی ہے، اسی لیے نتائج کا جائزہ ڈاکٹر لیتا ہے، اکیلے نہیں پڑھا جاتا۔",
    ],
  },
  {
    slug: "medicines", icon: "pill", titleEn: "Which medicines can affect kidneys?", titleUr: "کون سی ادویات گردوں کو متاثر کر سکتی ہیں؟",
    bodyEn: [
      "Some common medicines can strain the kidneys, especially if used regularly, in high doses, or if you already have reduced kidney function.",
      "NSAID painkillers (like ibuprofen, diclofenac, and naproxen) are a common example — occasional use is usually fine for most people, but regular or long-term use is worth discussing with a doctor.",
      "Certain antibiotics, contrast dye used in some scans, and some herbal or unregulated supplements can also affect the kidneys. Always tell your doctor about every medicine and supplement you take, especially if you have any kidney concerns.",
    ],
    bodyUr: [
      "کچھ عام ادویات گردوں پر دباؤ ڈال سکتی ہیں، خاص طور پر اگر باقاعدگی سے، زیادہ خوراک میں، یا پہلے سے گردوں کا کام کم ہو تو۔",
      "درد کش ادویات (NSAIDs) جیسے آئیبوپروفین، ڈائیکلوفیناک اور نیپروکسن اس کی ایک عام مثال ہیں — زیادہ تر لوگوں کے لیے کبھی کبھار استعمال عام طور پر ٹھیک ہے، لیکن باقاعدہ یا طویل مدتی استعمال کے بارے میں ڈاکٹر سے بات کرنی چاہیے۔",
      "بعض اینٹی بائیوٹکس، کچھ اسکینز میں استعمال ہونے والا کنٹراسٹ ڈائی، اور کچھ جڑی بوٹیوں یا غیر منظم سپلیمنٹس بھی گردوں کو متاثر کر سکتے ہیں۔ ہمیشہ اپنے ڈاکٹر کو ہر دوا اور سپلیمنٹ کے بارے میں بتائیں، خاص طور پر اگر آپ کو گردوں سے متعلق کوئی تشویش ہو۔",
    ],
  },
  {
    slug: "dialysis", icon: "stethoscope", titleEn: "What is dialysis?", titleUr: "ڈائیلاسز کیا ہے؟",
    bodyEn: [
      "Dialysis is a treatment that does some of the work healthy kidneys normally do — removing waste and extra fluid from the blood — when kidney function has dropped very low.",
      "Hemodialysis filters your blood through a machine, usually a few times a week at a clinic or hospital. Peritoneal dialysis uses the lining of your own abdomen to filter blood, and can often be done at home.",
      "Starting dialysis is a major decision made together with your nephrologist, based on your symptoms, lab results, and overall health — not on a single number.",
    ],
    bodyUr: [
      "ڈائیلاسز ایک علاج ہے جو صحت مند گردوں کا کچھ کام خود کرتا ہے — خون سے فاضل مادے اور اضافی پانی نکالنا — جب گردوں کا کام بہت کم ہو جائے۔",
      "ہیموڈائیلاسز خون کو ایک مشین کے ذریعے چھانتا ہے، عام طور پر ہفتے میں چند بار کلینک یا ہسپتال میں۔ پیریٹونیل ڈائیلاسز آپ کے اپنے پیٹ کی جھلی کو خون چھاننے کے لیے استعمال کرتا ہے، اور اکثر گھر پر کیا جا سکتا ہے۔",
      "ڈائیلاسز شروع کرنا ایک بڑا فیصلہ ہے جو آپ کے نیفرولوجسٹ کے ساتھ مل کر، آپ کی علامات، لیب نتائج اور مجموعی صحت کی بنیاد پر لیا جاتا ہے — نہ کہ صرف ایک نمبر کی بنیاد پر۔",
    ],
  },
  {
    slug: "transplant", icon: "heart-pulse", titleEn: "What is kidney transplant?", titleUr: "گردے کی پیوند کاری کیا ہے؟",
    bodyEn: [
      "A kidney transplant places a healthy kidney, from a living or deceased donor, into a person whose own kidneys no longer work well enough.",
      "One donated kidney can usually take over the job of two failed kidneys. After transplant, people generally take medicines for life to prevent their body from rejecting the new kidney.",
      "For many people with kidney failure, transplant can offer a better quality of life than long-term dialysis, though it isn't the right option for everyone — your nephrology team can help assess this.",
    ],
    bodyUr: [
      "گردے کی پیوند کاری میں ایک صحت مند گردہ، زندہ یا وفات پانے والے عطیہ دہندہ سے، اس شخص میں لگایا جاتا ہے جس کے اپنے گردے کافی حد تک کام نہیں کر رہے۔",
      "ایک عطیہ کیا گیا گردہ عام طور پر دو ناکام گردوں کا کام سنبھال سکتا ہے۔ پیوند کاری کے بعد، لوگ عام طور پر زندگی بھر ادویات لیتے ہیں تاکہ جسم نئے گردے کو مسترد نہ کرے۔",
      "گردوں کی ناکامی کے بہت سے مریضوں کے لیے، پیوند کاری طویل مدتی ڈائیلاسز کے مقابلے میں بہتر معیار زندگی دے سکتی ہے، اگرچہ یہ ہر کسی کے لیے صحیح آپشن نہیں — آپ کی نیفرولوجی ٹیم اس کا جائزہ لینے میں مدد کر سکتی ہے۔",
    ],
  },
  {
    slug: "diet", icon: "salad", titleEn: "Kidney disease & diet", titleUr: "گردوں کی بیماری اور خوراک",
    bodyEn: [
      "Diet advice for kidney health depends heavily on your stage of kidney function and other conditions, so this is general guidance, not a personal plan.",
      "Common themes include limiting added salt (to help blood pressure), being mindful of protein amounts, and sometimes watching potassium or phosphorus if levels run high on blood tests.",
      "Please don't start a strict kidney diet on your own — ask your doctor or a renal dietitian for guidance based on your own lab results and needs.",
    ],
    bodyUr: [
      "گردوں کی صحت کے لیے خوراک کا مشورہ آپ کے گردوں کے کام کی سطح اور دیگر بیماریوں پر بہت زیادہ منحصر ہوتا ہے، اس لیے یہ عمومی رہنمائی ہے، ذاتی منصوبہ نہیں۔",
      "عام موضوعات میں اضافی نمک کو محدود کرنا، پروٹین کی مقدار کا خیال رکھنا، اور بعض اوقات پوٹاشیم یا فاسفورس پر نظر رکھنا شامل ہے اگر بلڈ ٹیسٹ میں ان کی سطح زیادہ ہو۔",
      "براہ کرم خود سے سخت کڈنی ڈائٹ شروع نہ کریں — اپنے ڈاکٹر یا رینل ڈائیٹیشن سے اپنے لیب نتائج اور ضروریات کی بنیاد پر رہنمائی لیں۔",
    ],
  },
  {
    slug: "urgent", icon: "siren", titleEn: "When should I seek urgent help?", titleUr: "فوری مدد کب حاصل کرنی چاہیے؟",
    bodyEn: [
      "Seek medical care promptly if you notice: little or no urine output, sudden swelling of your face, legs or abdomen, blood in your urine, shortness of breath, confusion, or chest pain.",
      "These can be signs that need prompt evaluation, even if you've never had kidney problems before.",
      "If in doubt, it's always safer to get checked than to wait — a doctor can assess quickly whether something urgent is happening.",
    ],
    bodyUr: [
      "فوری طبی امداد حاصل کریں اگر آپ محسوس کریں: پیشاب کا بہت کم یا بالکل نہ آنا، چہرے، ٹانگوں یا پیٹ میں اچانک سوجن، پیشاب میں خون، سانس لینے میں دشواری، الجھن، یا سینے میں درد۔",
      "یہ علامات فوری جانچ کی ضرورت کی نشاندہی کر سکتی ہیں، چاہے آپ کو پہلے کبھی گردوں کا مسئلہ نہ رہا ہو۔",
      "اگر شک ہو تو انتظار کرنے کی بجائے جانچ کروانا ہمیشہ محفوظ ہوتا ہے — ڈاکٹر جلدی جائزہ لے سکتا ہے کہ کوئی ہنگامی صورتحال تو نہیں۔",
    ],
  },
  {
    slug: "survival", icon: "hourglass", titleEn: "How long can someone live with kidney disease?", titleUr: "گردوں کی بیماری کے ساتھ کوئی کتنا جی سکتا ہے؟",
    bodyEn: [
      "There is no single survival time that applies to everyone with CKD or kidney failure.",
      "It depends on many factors: age, other health conditions, how well kidney function is preserved, blood pressure and diabetes control, whether dialysis or transplant is needed, and overall health.",
      "Many people live long, active lives with CKD, especially when it's caught and managed early. For an assessment specific to you, your nephrologist is best placed to help — please don't rely on general numbers found online.",
    ],
    bodyUr: [
      "CKD یا گردوں کی ناکامی کے ہر مریض کے لیے کوئی ایک مقررہ بقا کا وقت نہیں ہے۔",
      "یہ کئی عوامل پر منحصر ہے: عمر، دیگر صحت کی حالتیں، گردوں کا کام کتنا محفوظ ہے، بلڈ پریشر اور ذیابیطس کا کنٹرول، ڈائیلاسز یا پیوند کاری کی ضرورت، اور مجموعی صحت۔",
      "بہت سے لوگ CKD کے ساتھ طویل، فعال زندگی گزارتے ہیں، خاص طور پر جب اسے ابتدائی مرحلے میں پکڑا اور سنبھالا جائے۔ آپ کے لیے مخصوص جائزے کے لیے، آپ کا نیفرولوجسٹ بہترین رہنمائی دے سکتا ہے — براہ کرم انٹرنیٹ پر ملنے والے عمومی نمبروں پر انحصار نہ کریں۔",
    ],
  },
];

export const FOODS: SeedFood[] = [
  // Fruits
  { slug: "banana", nameEn: "Banana", nameUr: "کیلا", category: "FRUITS", portions: p(NORMAL, "Avoid", "Avoid", "Avoid") },
  { slug: "apple", nameEn: "Apple", nameUr: "سیب", category: "FRUITS", portions: all(NORMAL) },
  { slug: "pear", nameEn: "Pear", nameUr: "ناشپاتی", category: "FRUITS", portions: all(NORMAL) },
  { slug: "orange_mosambi", nameEn: "Orange / Sweet Lime (Mosambi)", nameUr: "سنگترہ / مالٹا / مسمی", category: "FRUITS", portions: p("1 small", "1/2", "Avoid", "Avoid") },
  { slug: "mango", nameEn: "Mango", nameUr: "آم", category: "FRUITS", portions: p("1 small", "1/2 small", "Avoid", "Avoid") },
  { slug: "guava", nameEn: "Guava", nameUr: "امرود", category: "FRUITS", portions: all(NORMAL) },
  { slug: "papaya", nameEn: "Papaya", nameUr: "پپیتا", category: "FRUITS", portions: p("2 inch-thick slices", "2 inch-thick slices", "1 inch-thick slice", "1 inch-thick slice") },
  { slug: "peach", nameEn: "Peach", nameUr: "آڑو", category: "FRUITS", portions: all(NORMAL) },
  { slug: "chiku", nameEn: "Chiku / Sapodilla", nameUr: "چیکو", category: "FRUITS", portions: p("1 piece", "1 piece", "Avoid", "Avoid") },
  { slug: "plum", nameEn: "Plum", nameUr: "آلوبخارہ", category: "FRUITS", portions: all("2 small") },
  { slug: "pomegranate", nameEn: "Pomegranate", nameUr: "انار", category: "FRUITS", portions: p("1/4 small", "1/4 small", "Avoid", "Avoid") },
  { slug: "melon", nameEn: "Melon / Muskmelon", nameUr: "خربوزہ / گرما", category: "FRUITS", portions: p("1 inch-thick slice", "1 inch-thick slice", "Avoid", "Avoid") },
  { slug: "watermelon", nameEn: "Watermelon", nameUr: "تربوز", category: "FRUITS", portions: p("200 grams", "100 grams", "Avoid", "Avoid") },
  { slug: "lychee", nameEn: "Lychee", nameUr: "لیچی", category: "FRUITS", portions: p("5 pieces", "Avoid", "Avoid", "Avoid") },
  { slug: "dates", nameEn: "Dates", nameUr: "کھجور", category: "FRUITS", portions: p("2 pieces", "1 piece", "Avoid", "Avoid") },
  { slug: "cherry", nameEn: "Cherry", nameUr: "چیری", category: "FRUITS", portions: all("10–15 pieces") },
  { slug: "strawberry", nameEn: "Strawberry", nameUr: "اسٹرابری", category: "FRUITS", portions: p("8–10 pieces", "8–10 pieces", "5–6 pieces", "5–6 pieces") },
  { slug: "apricot_fresh", nameEn: "Apricot (fresh)", nameUr: "خوبانی (تازہ)", category: "FRUITS", portions: p("2 pieces", "1 piece", "1 piece", "1 piece") },
  { slug: "persimmon", nameEn: "Persimmon (Japani Phal)", nameUr: "جاپانی پھل", category: "FRUITS", portions: all("Half") },
  { slug: "falsa", nameEn: "Falsa Berry", nameUr: "فالسہ", category: "FRUITS", portions: all("1/4 cup") },
  { slug: "blueberry_blackberry", nameEn: "Blueberry / Blackberry", nameUr: "بلو بیری / بلیک بیری", category: "FRUITS", portions: all("8–10 pieces") },
  { slug: "avocado", nameEn: "Avocado", nameUr: "ایوکاڈو", category: "FRUITS", portions: p("To taste, small amount", "Avoid", "Avoid", "Avoid") },
  { slug: "grapes", nameEn: "Grapes", nameUr: "انگور", category: "FRUITS", potassium: "L", phosphorus: "L" },
  { slug: "pineapple", nameEn: "Pineapple", nameUr: "انناس", category: "FRUITS", potassium: "L", phosphorus: "L" },
  { slug: "orange_juice", nameEn: "Orange Juice", nameUr: "سنگترے کا جوس", category: "FRUITS", potassium: "H" },
  { slug: "kiwi", nameEn: "Kiwi", nameUr: "کیوی", category: "FRUITS", potassium: "H" },
  { slug: "lemon", nameEn: "Lemon", nameUr: "لیموں", category: "FRUITS", potassium: "L" },
  // Vegetables
  { slug: "potato", nameEn: "Potato", nameUr: "آلو", category: "VEGETABLES", portions: p("Half medium", "Avoid", "Avoid", "Avoid") },
  { slug: "taro", nameEn: "Arvi / Taro", nameUr: "اروی", category: "VEGETABLES", portions: p("1 medium", "Half", "Avoid", "1/2 medium") },
  { slug: "beetroot", nameEn: "Beetroot", nameUr: "چقندر", category: "VEGETABLES", portions: p("1 medium", "Avoid", "Avoid", "Avoid") },
  { slug: "sweet_potato", nameEn: "Sweet Potato", nameUr: "شکرکندی", category: "VEGETABLES", portions: p("1/2 medium", "Avoid", "Avoid", "Avoid") },
  { slug: "spinach", nameEn: "Saag / Spinach", nameUr: "ساگ / پالک", category: "VEGETABLES", portions: p("1/4 plate", "1/4 plate", "Avoid", "Avoid") },
  { slug: "cabbage", nameEn: "Cabbage", nameUr: "بند گوبھی", category: "VEGETABLES", portions: all("1/2 plate") },
  { slug: "eggplant", nameEn: "Eggplant / Brinjal", nameUr: "بینگن", category: "VEGETABLES", portions: all("1/2 plate") },
  { slug: "turnip", nameEn: "Turnip", nameUr: "شلجم", category: "VEGETABLES", portions: all("1/2 plate") },
  { slug: "cauliflower", nameEn: "Cauliflower", nameUr: "گوبھی", category: "VEGETABLES", portions: all("1/2 plate") },
  { slug: "okra", nameEn: "Okra (Bhindi)", nameUr: "بھنڈی", category: "VEGETABLES", portions: p("1/2 plate", "1/2 plate", "1/4 plate", "1/4 plate") },
  { slug: "bitter_gourd", nameEn: "Bitter Gourd (Karela)", nameUr: "کریلا", category: "VEGETABLES", portions: p("1/2 plate", "1/2 plate", "1/4 plate", "1/4 plate") },
  { slug: "pumpkin_gourd", nameEn: "Pumpkin / Gourd", nameUr: "کدو", category: "VEGETABLES", portions: p("1/2 plate", "1/2 plate", "1/4 plate", "1/4 plate") },
  { slug: "mushroom", nameEn: "Mushroom", nameUr: "مشروم", category: "VEGETABLES", portions: p("1 piece", "Avoid", "Avoid", "Avoid") },
  { slug: "cucumber", nameEn: "Cucumber", nameUr: "کھیرا", category: "VEGETABLES", portions: p("1 medium", "1 medium", "1/2 medium", "1/2 medium") },
  { slug: "carrot", nameEn: "Carrot", nameUr: "گاجر", category: "VEGETABLES", portions: p("1 medium", "1 medium", "1/2 medium", "1/2 medium") },
  { slug: "radish", nameEn: "Radish", nameUr: "مولی", category: "VEGETABLES", portions: p("2 pieces", "1 piece", "1 piece", "1 piece") },
  { slug: "lettuce", nameEn: "Lettuce Leaves", nameUr: "سلاد کے پتے", category: "VEGETABLES", portions: all("1/2 cup") },
  { slug: "tomato", nameEn: "Tomato", nameUr: "ٹماٹر", category: "VEGETABLES", potassium: "H" },
  { slug: "french_fries", nameEn: "French Fries", nameUr: "فرنچ فرائز", category: "VEGETABLES", potassium: "H", sodium: "H" },
  { slug: "potato_chips", nameEn: "Potato Chips", nameUr: "آلو کے چپس", category: "VEGETABLES", potassium: "H", sodium: "H" },
  { slug: "asparagus", nameEn: "Asparagus", nameUr: "ایسپریگس", category: "VEGETABLES", potassium: "H" },
  { slug: "celery", nameEn: "Celery", nameUr: "سیلری", category: "VEGETABLES", potassium: "L" },
  { slug: "pepper", nameEn: "Pepper", nameUr: "شملہ مرچ", category: "VEGETABLES", potassium: "L" },
  { slug: "squash_summer", nameEn: "Zucchini / Summer Squash", nameUr: "توری", category: "VEGETABLES", potassium: "L" },
  { slug: "onion", nameEn: "Onion", nameUr: "پیاز", category: "VEGETABLES", potassium: "L" },
  { slug: "green_peas", nameEn: "Green Peas", nameUr: "مٹر", category: "VEGETABLES", potassium: "L" },
  { slug: "green_beans", nameEn: "Green / Wax Beans", nameUr: "پھلیاں", category: "VEGETABLES", potassium: "L", phosphorus: "L" },
  { slug: "dried_beans_peas", nameEn: "Dried Beans, Peas & Lima Beans", nameUr: "خشک لوبیا و مٹر", category: "VEGETABLES", potassium: "H", phosphorus: "H" },
  // Dry fruits & nuts
  { slug: "almonds_raisins", nameEn: "Almonds / Raisins", nameUr: "بادام / کشمش", category: "DRY_FRUITS", portions: p("2–3 pieces", "2–3 pieces", "Avoid", "Avoid") },
  { slug: "walnut", nameEn: "Walnut", nameUr: "اخروٹ", category: "DRY_FRUITS", portions: p("1–2 pieces", "1 piece", "Avoid", "Avoid") },
  { slug: "cashew", nameEn: "Cashew", nameUr: "کاجو", category: "DRY_FRUITS", portions: p("1–2 pieces", "Avoid", "Avoid", "Avoid") },
  { slug: "pistachio", nameEn: "Pistachio", nameUr: "پستہ", category: "DRY_FRUITS", portions: p("7–8 pieces", "7–8 pieces", "Avoid", "Avoid") },
  { slug: "peanuts", nameEn: "Peanuts", nameUr: "مونگ پھلی", category: "DRY_FRUITS", portions: p("3–4 pieces", "3–4 pieces", "Avoid", "Avoid") },
  { slug: "dried_apricot", nameEn: "Dried Apricot", nameUr: "خشک خوبانی", category: "DRY_FRUITS", portions: p("1–2 pieces", "1–2 pieces", "Avoid", "Avoid") },
  { slug: "dried_fig", nameEn: "Dried Fig", nameUr: "انجیر", category: "DRY_FRUITS", portions: p("1 piece", "Avoid", "Avoid", "Avoid") },
  { slug: "pine_nuts", nameEn: "Pine Nuts / Chilgoza", nameUr: "چلغوزہ", category: "DRY_FRUITS", portions: p("A few grains", "A few grains", "Avoid", "Avoid") },
  // Grains & snacks
  { slug: "rice", nameEn: "Rice", nameUr: "چاول", category: "GRAINS", meals: ["LUNCH", "DINNER"], portions: all("Half plate") },
  { slug: "moong_masoor_dal", nameEn: "Moong / Masoor Dal (split, washed)", nameUr: "مونگ / مسور کی دھلی دال", category: "GRAINS", meals: ["LUNCH", "DINNER"], portions: p("Half plate", "Half plate", "Half plate", "1 plate") },
  { slug: "chana_dal", nameEn: "Chana Dal", nameUr: "چنا دال", category: "GRAINS", meals: ["LUNCH", "DINNER"], portions: p("Half plate", "Avoid", "Avoid", "Avoid") },
  { slug: "cornflakes", nameEn: "Cornflakes (plain)", nameUr: "کارن فلیکس (سادہ)", category: "GRAINS", meals: ["BREAKFAST"], portions: all(NORMAL) },
  { slug: "wheat_flour", nameEn: "Wheat Flour (sifted)", nameUr: "گندم کا آٹا (چھنا ہوا)", category: "GRAINS", meals: ["LUNCH", "DINNER", "BREAKFAST"], portions: all(NORMAL) },
  { slug: "barley_flour", nameEn: "Barley Flour (Jo ka Atta)", nameUr: "جو کا آٹا", category: "GRAINS", meals: ["LUNCH", "DINNER", "BREAKFAST"], portions: p(NORMAL, "Small amount", "Avoid", "Avoid") },
  { slug: "macaroni_cheese", nameEn: "Macaroni & Cheese", nameUr: "میکرونی اینڈ چیز", category: "GRAINS", meals: ["LUNCH", "DINNER"], phosphorus: "H" },
  { slug: "biscuits_mix", nameEn: "Biscuits", nameUr: "بسکٹ", category: "GRAINS", meals: ["BREAKFAST", "SNACK"], phosphorus: "H" },
  { slug: "pancakes_mix", nameEn: "Pancakes", nameUr: "پین کیک", category: "GRAINS", meals: ["BREAKFAST"], phosphorus: "H" },
  { slug: "pasta", nameEn: "Pasta", nameUr: "پاستا", category: "GRAINS", meals: ["LUNCH", "DINNER"], phosphorus: "L" },
  { slug: "saltine_crackers", nameEn: "Saltine Crackers", nameUr: "نمکین کریکرز", category: "GRAINS", meals: ["SNACK"], phosphorus: "L" },
  { slug: "popcorn_plain", nameEn: "Popcorn (plain)", nameUr: "پاپ کارن (سادہ)", category: "GRAINS", meals: ["SNACK"], phosphorus: "L" },
  { slug: "salted_chips", nameEn: "Salted Potato Chips", nameUr: "نمکین آلو چپس", category: "GRAINS", meals: ["SNACK"], sodium: "H" },
  { slug: "salted_pretzels", nameEn: "Salted Pretzels", nameUr: "نمکین پریٹزل", category: "GRAINS", meals: ["SNACK"], sodium: "H" },
  { slug: "salted_nuts", nameEn: "Salted Nuts", nameUr: "نمکین میوہ جات", category: "GRAINS", meals: ["SNACK"], sodium: "H" },
  // Dairy & drinks
  { slug: "milk", nameEn: "Milk", nameUr: "دودھ", category: "DAIRY", meals: ["BREAKFAST"], portions: p("1 pao (~250ml)", "Avoid", "Avoid", "Avoid") },
  { slug: "yogurt", nameEn: "Yogurt", nameUr: "دہی", category: "DAIRY", meals: ["LUNCH", "DINNER"], portions: p("1 pao (~250g)", "Avoid", "Avoid", "Avoid") },
  { slug: "juices", nameEn: "Fruit Juices", nameUr: "پھلوں کے جوسز", category: "DAIRY", meals: ["BREAKFAST", "SNACK"], portions: p("Half glass", "Half glass", "Avoid", "Avoid") },
  { slug: "custard_icecream", nameEn: "Custard / Ice Cream", nameUr: "کسٹرڈ / آئس کریم", category: "DAIRY", meals: ["SNACK"], portions: p("Small amount, for taste", "Small amount, for taste", "Avoid", "Avoid") },
  { slug: "water", nameEn: "Water", nameUr: "پانی", category: "DAIRY", mealExclude: true, portions: p("As needed", "As needed", "As advised by your doctor", "1 liter") },
  { slug: "coke_pepsi", nameEn: "Coke / Pepsi", nameUr: "کوک / پیپسی", category: "DAIRY", mealExclude: true, portions: all("Avoid") },
  { slug: "coffee_cocoa", nameEn: "Coffee / Cocoa", nameUr: "کافی / کوکو", category: "DAIRY", meals: ["BREAKFAST"], potassium: "H", phosphorus: "H" },
  { slug: "cheese", nameEn: "Cheese", nameUr: "پنیر", category: "DAIRY", meals: ["BREAKFAST", "SNACK"], phosphorus: "H", sodium: "H" },
  { slug: "cranberry_juice", nameEn: "Cranberry Juice", nameUr: "کرینبیری جوس", category: "DAIRY", meals: ["BREAKFAST", "SNACK"], phosphorus: "L" },
  // Protein
  { slug: "egg", nameEn: "Egg", nameUr: "انڈہ", category: "PROTEIN", vegetarian: false, meals: ["BREAKFAST"], portions: p("1 piece", "1 piece", "1 piece", "1 whole + 2 egg whites (confirm with your team)") },
  { slug: "chicken_fish", nameEn: "Chicken / Fish", nameUr: "مرغی / مچھلی", category: "PROTEIN", vegetarian: false, meals: ["LUNCH", "DINNER"], portions: p("Half pao (~125g)", "Half pao (~125g)", "Half pao (~125g)", "1 pao (~250g)") },
  { slug: "lobia", nameEn: "Lobia (Black-eyed Peas)", nameUr: "لوبیہ", category: "PROTEIN", meals: ["LUNCH", "DINNER"], portions: p("Half plate", "Avoid", "Avoid", "Avoid") },
  { slug: "shrimp", nameEn: "Shrimp", nameUr: "شرمپس", category: "PROTEIN", vegetarian: false, meals: ["LUNCH", "DINNER"], portions: all(NORMAL) },
  { slug: "prawns", nameEn: "Prawns", nameUr: "پران", category: "PROTEIN", vegetarian: false, meals: ["LUNCH", "DINNER"], portions: all(NORMAL) },
  { slug: "liver_organ", nameEn: "Liver & Organ Meats", nameUr: "کلیجی اور اندرونی اعضاء", category: "PROTEIN", vegetarian: false, meals: ["LUNCH", "DINNER"], phosphorus: "H" },
  { slug: "hotdogs_sausage", nameEn: "Hotdogs & Sausage", nameUr: "ہاٹ ڈاگ اور ساسیج", category: "PROTEIN", vegetarian: false, meals: ["SNACK"], phosphorus: "H", sodium: "H" },
  { slug: "gyro_meat", nameEn: "Gyro / Cold Cuts / Salami", nameUr: "کولڈ کٹس / سلامی", category: "PROTEIN", vegetarian: false, meals: ["BREAKFAST", "SNACK"], sodium: "H" },
  { slug: "corned_beef", nameEn: "Corned Beef", nameUr: "کارنڈ بیف", category: "PROTEIN", vegetarian: false, meals: ["BREAKFAST", "SNACK"], sodium: "H" },
  { slug: "canned_meat", nameEn: "Canned Meat", nameUr: "ڈبہ والا گوشت", category: "PROTEIN", vegetarian: false, meals: ["LUNCH", "DINNER"], portions: all("Avoid") },
  { slug: "beans_dried", nameEn: "Beans (dried)", nameUr: "خشک لوبیا", category: "PROTEIN", meals: ["LUNCH", "DINNER"], phosphorus: "H", potassium: "H" },
  // Other
  { slug: "salt", nameEn: "Salt", nameUr: "نمک", category: "OTHER", mealExclude: true, portions: p("2–4 grams/day", "2 grams/day", "2 grams/day", "2 grams/day") },
  { slug: "oil", nameEn: "Cooking Oil", nameUr: "کھانا پکانے کا تیل", category: "OTHER", mealExclude: true, portions: all("As needed") },
  { slug: "ghee_butter", nameEn: "Ghee / Butter", nameUr: "گھی / مکھن", category: "OTHER", mealExclude: true, portions: all("Avoid") },
  { slug: "garam_masala", nameEn: "Garam Masala / Spices", nameUr: "گرم مصالحہ جات", category: "OTHER", mealExclude: true, portions: p("As needed", "Minimal", "Minimal", "Minimal") },
  { slug: "red_chili", nameEn: "Red Chili", nameUr: "لال مرچ", category: "OTHER", mealExclude: true, portions: all("To taste") },
  { slug: "turmeric", nameEn: "Turmeric", nameUr: "ہلدی", category: "OTHER", mealExclude: true, portions: all(NORMAL) },
  { slug: "cumin", nameEn: "Cumin", nameUr: "زیرہ", category: "OTHER", mealExclude: true, portions: all(NORMAL) },
  { slug: "black_pepper", nameEn: "Black Pepper", nameUr: "کالی مرچ", category: "OTHER", mealExclude: true, portions: all("To taste") },
  { slug: "corn", nameEn: "Corn (on the cob)", nameUr: "کارن (بھٹہ)", category: "OTHER", meals: ["SNACK"], portions: p("Small amount, for taste", "Avoid", "Avoid", "Avoid") },
  { slug: "chocolate", nameEn: "Chocolate", nameUr: "چاکلیٹ", category: "OTHER", meals: ["SNACK"], portions: p("Small amount, for taste", "Avoid", "Avoid", "Avoid") },
  { slug: "tomato_sauce", nameEn: "Tomato / Spaghetti Sauce", nameUr: "ٹماٹو ساس", category: "OTHER", mealExclude: true, potassium: "H" },
  { slug: "salt_substitute", nameEn: "Salt Substitute", nameUr: "نمک کا متبادل", category: "OTHER", mealExclude: true, potassium: "H" },
  { slug: "pizza", nameEn: "Pizza", nameUr: "پیزا", category: "OTHER", meals: ["LUNCH", "DINNER"], phosphorus: "H", sodium: "H" },
  { slug: "pickles_relish", nameEn: "Pickles / Relish", nameUr: "اچار", category: "OTHER", mealExclude: true, sodium: "H" },
  { slug: "canned_soup", nameEn: "Canned Soup", nameUr: "ڈبے کا سوپ", category: "OTHER", meals: ["LUNCH", "DINNER"], sodium: "H" },
  { slug: "canned_vegetables", nameEn: "Canned Vegetables", nameUr: "ڈبے کی سبزیاں", category: "OTHER", meals: ["LUNCH", "DINNER"], sodium: "H" },
  { slug: "olives", nameEn: "Olives", nameUr: "زیتون", category: "OTHER", meals: ["SNACK"], sodium: "H" },
  { slug: "sardines", nameEn: "Sardines", nameUr: "سارڈینز", category: "OTHER", vegetarian: false, meals: ["LUNCH", "DINNER"], sodium: "H" },
];

// Urdu translations of the standard portion phrases. Admins can override per food.
export const PORTION_UR: Record<string, string> = {
  "Allowed in normal amount": "معمول کی مقدار میں کھایا جا سکتا ہے",
  Avoid: "پرہیز کریں",
  "1 small": "1 چھوٹا",
  "1/2": "آدھا",
  "1/2 small": "آدھا چھوٹا",
  "2 inch-thick slices": "2 انچ موٹی قاشیں",
  "1 inch-thick slice": "1 انچ موٹی قاش",
  "1 piece": "1 عدد",
  "2 small": "2 چھوٹے",
  "1/4 small": "1/4 چھوٹا",
  "200 grams": "200 گرام",
  "100 grams": "100 گرام",
  "5 pieces": "5 عدد",
  "2 pieces": "2 عدد",
  "10–15 pieces": "10-15 دانے",
  "8–10 pieces": "8-10 دانے",
  "5–6 pieces": "5-6 دانے",
  Half: "آدھا",
  "1/4 cup": "1/4 کپ",
  "To taste, small amount": "حسب ذائقہ، تھوڑی مقدار",
  "Half medium": "آدھا درمیانہ",
  "1 medium": "1 درمیانہ",
  "1/2 medium": "1/2 درمیانہ",
  "1/4 plate": "1/4 پلیٹ",
  "1/2 plate": "1/2 پلیٹ",
  "1/2 cup": "1/2 کپ",
  "2–3 pieces": "2-3 عدد",
  "1–2 pieces": "1-2 عدد",
  "7–8 pieces": "7-8 دانے",
  "3–4 pieces": "3-4 دانے",
  "A few grains": "چند دانے",
  "Half plate": "آدھی پلیٹ",
  "1 plate": "ایک پلیٹ",
  "Small amount": "تھوڑی مقدار",
  "1 pao (~250ml)": "ایک پاؤ (~250ml)",
  "1 pao (~250g)": "ایک پاؤ (~250 گرام)",
  "Half glass": "آدھا گلاس",
  "Small amount, for taste": "ذائقہ کے لیے تھوڑی مقدار",
  "As needed": "حسب ضرورت",
  "As advised by your doctor": "ڈاکٹر کے مشورے سے",
  "1 liter": "1 لیٹر",
  "1 whole + 2 egg whites (confirm with your team)": "1 پورا انڈہ + 2 سفیدیاں (اپنی طبی ٹیم سے تصدیق کریں)",
  "Half pao (~125g)": "آدھا پاؤ (~125 گرام)",
  "2–4 grams/day": "2-4 گرام / دن",
  "2 grams/day": "2 گرام / دن",
  Minimal: "کم سے کم",
  "To taste": "حسب ذائقہ",
};
