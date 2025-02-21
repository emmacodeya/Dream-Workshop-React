import "bootstrap/dist/css/bootstrap.min.css";

const PrivacyPolicy = () => {
  return (
    <div className="container py-5 mt-14">
      <h2 className="mb-6 fs-2 text-white">隱私保護政策</h2>

      {/* 什麼是隱私權政策? */}
      <h4 className="mb-2 text-light">什麼是隱私權政策?</h4>
      <p className="mb-10">
        我們十分重視會員的隱私權保護，除嚴格遵守我國個人資料保護法及相關法令規定外，...
      </p>

      {/* 隱私權保護政策的適用範圍 */}
      <h5 className="text-light mb-2">一、 隱私權保護政策的適用範圍</h5>
      <ul className="ps-9">
        <li>隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。</li>
        <li>隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。</li>
      </ul>

      {/* 個人資料的蒐集、處理及利用方式 */}
      <h5 className="text-light mb-2">二、 個人資料的蒐集、處理及利用方式</h5>
      <ul className="ps-9">
        <li>當您蒞臨本網站或參與本網站活動時，我們將視活動性質請您提供必要的個人資料。</li>
        <li>
          本網站蒐集足以識別使用者身分的個人資料，僅供本網站於其內部、依照蒐集之目的進行處理和利用...
        </li>
      </ul>

      {/* 資料之保護 */}
      <h5 className="text-light mb-2">三、 資料之保護</h5>
      <ul className="ps-9">
        <li>
          本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施...
        </li>
        <li>如因業務需要有必要委託本網站相關單位提供服務時，我們亦會嚴格要求其遵守保密義務。</li>
      </ul>

      {/* 網站對外的相關連結 */}
      <h5 className="text-light mb-2">四、 網站對外的相關連結</h5>
      <p>
        本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結進入其他網站...
      </p>

      {/* 與第三人共用個人資料之政策 */}
      <h5 className="text-light mb-2">五、 與第三人共用個人資料之政策</h5>
      <p>
        本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關...
      </p>
      <p>前項但書之情形包括不限於：</p>
      <ul className="ps-9">
        <li>經由您同意。</li>
        <li>法律明文規定。</li>
        <li>為維護國家安全或增進公共利益。</li>
        <li>當您在本網站的行為，違反本網站的服務條款時，經本網站揭露您的個人資料是為了辨識或採取法律行動所必要者。</li>
      </ul>

      {/* Cookie 之使用 */}
      <h5 className="text-light mb-2">六、 Cookie 之使用</h5>
      <p>
        為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的 Cookie...
      </p>
      <p>如何關閉 Cookie?</p>
      <p>
        瀏覽器允許您更改 Cookie 的設定。這些設定可以在您的瀏覽器選單上的「選項」或 「設定」找到...
      </p>

      {/* 隱私權保護政策之修正 */}
      <h5 className="text-light mb-2">七、 隱私權保護政策之修正</h5>
      <p>本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。</p>
    </div>
  );
};

export default PrivacyPolicy;
