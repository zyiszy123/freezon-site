(() => {
  const gallery = document.querySelector('[data-vault-gallery]');
  if (!gallery) return;
  const names = ['01_dual_vault', '02_pure_experience', '03_lossless_media', '04_cross_vault_migration', '05_safe_cleanup', '06_encrypted_backup'];
  const copy = {
    "ko": {"device":"표시 기기","topics":"기능 목록","previous":"이전 이미지","next":"다음 이미지","open":"이미지 확대","close":"미리보기 닫기","preview":"홍보 이미지 미리보기","titles":["서로 독립된 두 앨범","광고 없이 사진에 집중","원본 미디어 그대로","앨범 사이에서 이동","삭제 전에 원본 확인","암호화 백업과 복원"],"labels":["두 앨범","광고 없음","원본 화질","앨범 간 이동","원본 정리","암호화 백업"],"descriptions":["일상 앨범과 비공개 앨범은 각각 별도의 비밀번호, 암호화 키, 복구 코드를 사용합니다. 사진과 비디오는 기기 안에서 암호화해 보관합니다.","계정을 만들지 않아도 됩니다. 시작 화면 광고, 팝업 광고, 분석 및 추적 SDK 없이 사진을 보고 정리하세요.","사진, 비디오, Live Photo, GIF, RAW/ProRAW 등을 지원합니다. 사진 앱이 제공하는 원본 리소스를 의도적으로 압축하거나 바꾸지 않고 저장하며, 확인 가능한 촬영 정보도 함께 보관합니다.","선택한 항목을 일상 앨범이나 비공개 앨범으로 옮길 수 있습니다. 이동할 항목과 앨범을 확인하고 두 비밀번호를 검증한 뒤, 이동한 앨범의 키로 보호합니다.","사진 앱의 원본을 그대로 두거나 나중에 정리할 수 있습니다. 삭제를 요청하기 전에 앱 내 사본, 백업 상태, 선택 항목을 다시 확인하고 동의를 받습니다. 삭제한 원본은 보통 최근 삭제된 항목으로 이동합니다.","파일 앱에서 선택한 위치에 앨범별로 암호화 백업을 저장합니다. 증분 백업과 중단 후 재개를 지원하며, 재설치하거나 다른 iPhone 또는 iPad로 바꾼 뒤 해당 복구 코드로 복원할 수 있습니다."]},
    "es-419": {"device":"Dispositivo","topics":"Funciones","previous":"Imagen anterior","next":"Imagen siguiente","open":"Ampliar imagen","close":"Cerrar vista previa","preview":"Vista previa","titles":["Dos álbumes independientes","Tus fotos, sin anuncios","Conserva los archivos originales","Mueve entre álbumes","Revisa antes de borrar","Respaldo cifrado y restauración"],"labels":["Dos álbumes","Sin anuncios","Calidad original","Mover fotos","Revisar originales","Respaldo cifrado"],"descriptions":["El Álbum diario y el Álbum privado tienen contraseñas, claves y códigos de recuperación separados. Tus fotos y videos se guardan cifrados en el dispositivo.","No necesitas una cuenta. Sin anuncios al abrir la app, ventanas publicitarias ni SDK de análisis o seguimiento. Mira y organiza tus fotos sin interrupciones.","Admite fotos, videos, Live Photos, GIFs, RAW/ProRAW y más. Guarda los recursos originales de Fotos sin comprimirlos ni sustituirlos de forma intencional, junto con los datos de captura disponibles.","Mueve los elementos seleccionados al Álbum diario o al Álbum privado. Freezon confirma el destino y los elementos, verifica ambas contraseñas y protege los archivos con las claves del álbum de destino.","Puedes conservar los originales en Fotos o revisarlos más adelante. Antes de pedir que se borren, Freezon comprueba la copia de la app, el estado del respaldo y los elementos seleccionados, y te pide confirmación. Los originales borrados normalmente pasan a Eliminado recientemente.","Respalda cada álbum por separado en la ubicación que elijas en Archivos. Los respaldos son incrementales y se pueden reanudar. Después de reinstalar o cambiar de iPhone o iPad, restaura con el código de recuperación correspondiente."]},
    "pt-BR": {"device":"Dispositivo","topics":"Recursos","previous":"Imagem anterior","next":"Próxima imagem","open":"Ampliar imagem","close":"Fechar prévia","preview":"Prévia","titles":["Dois álbuns independentes","Suas fotos, sem anúncios","Mídia original preservada","Mova entre álbuns","Confira antes de apagar","Backup criptografado e restauração"],"labels":["Dois álbuns","Sem anúncios","Qualidade original","Mover fotos","Revisar originais","Backup criptografado"],"descriptions":["O Álbum do dia a dia e o Álbum privado usam senhas, chaves e códigos de recuperação separados. As fotos e os vídeos ficam criptografados no dispositivo.","Não é preciso criar uma conta. Sem anúncios na abertura, pop-ups de publicidade ou SDKs de análise e rastreamento. Veja e organize suas fotos sem interrupções.","Compatível com fotos, vídeos, Live Photos, GIFs, RAW/ProRAW e outros formatos. Salva os recursos originais do app Fotos sem comprimir ou substituir intencionalmente, junto com as informações de captura disponíveis.","Mova os itens selecionados para o Álbum do dia a dia ou para o Álbum privado. O Freezon confirma o destino e os itens, verifica as duas senhas e protege os arquivos com as chaves do álbum de destino.","Você pode manter os originais no app Fotos ou revisá-los depois. Antes de solicitar a exclusão, o Freezon confere a cópia no app, o estado do backup e os itens selecionados, e pede sua confirmação. Os originais apagados normalmente vão para Apagados.","Faça backup de cada álbum separadamente no local que escolher no app Arquivos. Os backups são incrementais e podem ser retomados. Depois de reinstalar ou trocar de iPhone ou iPad, restaure com o código de recuperação correspondente."]},
    'zh-Hans': {
      device: '展示设备', topics: '功能主题', previous: '上一张宣传图', next: '下一张宣传图', open: '放大宣传图', close: '关闭预览', preview: '宣传图预览',
      titles: ['两个独立相册', '没有广告打扰', '保留原始媒体', '在相册之间移动', '逐项确认原片清理', '加密备份与恢复'],
      labels: ['独立相册', '无广告', '原始画质', '相册互移', '原片清理', '加密备份'],
      descriptions: [
        '日常相册与私密相册分别使用独立密码、密钥和安全恢复码，照片和视频在本机加密保存。',
        '无需注册账号，没有开屏广告、广告弹窗、分析或用户跟踪 SDK。浏览和整理照片时不受广告打扰。',
        '支持照片、视频、Live Photo、GIF、RAW/ProRAW 等，保存系统“照片”提供的原始资源，不主动压缩或替换，并保留可读取的拍摄信息。',
        '可将选中内容移到日常相册或私密相册。确认目标和所选内容、验证两个相册的密码后，使用目标相册的密钥保护。',
        '可保留系统相册原件，也可稍后选择清理。申请删除前重新检查 App 内副本、备份状态和所选内容，再由你确认。系统原件通常先进入“最近删除”。',
        '每个相册可独立备份到系统“文件”中选择的位置，支持增量备份与中断后继续。重新安装或更换 iPhone、iPad 后，用对应安全恢复码恢复。'
      ]
    },
    'zh-Hant': {
      device: '展示裝置', topics: '功能主題', previous: '上一張宣傳圖', next: '下一張宣傳圖', open: '放大宣傳圖', close: '關閉預覽', preview: '宣傳圖預覽',
      titles: ['兩個獨立相簿', '沒有廣告打擾', '保留原始媒體', '在相簿之間移動', '逐項確認原始檔清理', '加密備份與復原'],
      labels: ['獨立相簿', '無廣告', '原始畫質', '相簿互移', '原始檔清理', '加密備份'],
      descriptions: [
        '日常相簿與私密相簿分別使用獨立密碼、金鑰與安全復原碼，照片與影片在本機加密儲存。',
        '無須註冊帳號，沒有開屏廣告、廣告彈出視窗、分析或使用者追蹤 SDK。瀏覽與整理照片時不受廣告打擾。',
        '支援照片、影片、Live Photo、GIF、RAW/ProRAW 等，儲存系統「照片」提供的原始資源，不主動壓縮或取代，並保留可讀取的拍攝資訊。',
        '可將所選內容移至日常相簿或私密相簿。確認目的地與所選內容、驗證兩個相簿的密碼後，使用目的地相簿的金鑰保護。',
        '可保留系統「照片」原始檔，也可稍後選擇清理。要求刪除前重新檢查 App 內副本、備份狀態與所選內容，再由你確認。原始檔通常先進入「最近刪除」。',
        '每個相簿可獨立備份至系統「檔案」中選擇的位置，支援增量備份與中斷後繼續。重新安裝或更換 iPhone、iPad 後，以對應安全復原碼復原。'
      ]
    },
    en: {
      device: 'Display device', topics: 'Feature topics', previous: 'Previous poster', next: 'Next poster', open: 'Enlarge poster', close: 'Close preview', preview: 'Poster preview',
      titles: ['Two separate albums', 'No advertising interruptions', 'Keep original media', 'Move between albums', 'Review originals before removal', 'Encrypted backup and restore'],
      labels: ['Separate albums', 'No ads', 'Original quality', 'Move photos', 'Review originals', 'Encrypted backup'],
      descriptions: [
        'The Everyday and Private Albums each use separate passwords, keys, and Recovery Codes. Photos and videos are encrypted on your device.',
        'No account, splash-screen ads, ad pop-ups, analytics, or tracking SDKs. Browse and organize photos without advertising interruptions.',
        'Supports photos, videos, Live Photos, GIFs, RAW/ProRAW, and more. Saves original resources from Photos without intentionally compressing or replacing them, along with available capture details.',
        'Move selected items to the Everyday or Private Album. Freezon confirms the destination and items, verifies both passwords, then protects the moved items with the destination album’s keys.',
        'Keep originals in Photos or select them for removal later. Freezon rechecks the in-app copy, backup status, and selected items before asking you to confirm. Removed originals normally go to Recently Deleted.',
        'Back up each album separately to a location you choose in Files, with incremental backups and resume support. Restore after reinstalling or moving to another iPhone or iPad with the matching Recovery Code.'
      ]
    },
    ja: {
      device: '表示デバイス', topics: '機能の一覧', previous: '前のポスター', next: '次のポスター', open: 'ポスターを拡大', close: 'プレビューを閉じる', preview: 'ポスターのプレビュー',
      titles: ['独立した2つのアルバム', '広告による中断なし', 'オリジナルのメディアを保存', 'アルバム間で移動', '削除前にオリジナルを確認', '暗号化バックアップと復元'],
      labels: ['独立アルバム', '広告なし', '元の画質', 'アルバム間移動', 'オリジナルの整理', '暗号化バックアップ'],
      descriptions: [
        '日常用とプライベート、それぞれに専用のパスワード、暗号鍵、リカバリーコードがあります。写真とビデオは端末内で暗号化して保存します。',
        'アカウント登録不要。起動画面の広告や広告ポップアップ、分析・追跡SDKはありません。写真の閲覧や整理を広告に中断されずに行えます。',
        '写真、ビデオ、Live Photos、GIF、RAW/ProRAWなどに対応。「写真」から取得できるオリジナルを意図的に圧縮・置換せず、取得可能な撮影情報とともに保存します。',
        '選択した項目を日常用またはプライベートアルバムへ移動できます。移動先と項目を確認し、両方のパスワードを検証して、移動先の暗号鍵で保護します。',
        '「写真」のオリジナルは残すことも、後から整理することもできます。削除の前にアプリ内のコピー、バックアップ状態、選択内容を再確認し、同意を求めます。削除後は通常「最近削除した項目」に移ります。',
        '「ファイル」で選択した保存先にアルバムごとにバックアップ。増分バックアップと中断後の再開に対応。再インストールや別のiPhone・iPadへの移行後、対応するリカバリーコードで復元できます。'
      ]
    }
  };
  const narrow = matchMedia('(max-width: 600px)');
  const devices = {
    iphone: { name: 'iPhone', widths: [660, 1320], size: [1320, 2868] },
    ipad: { name: 'iPad', widths: [1100, 2752], size: [2752, 2064] },
    duo: { name: 'iPhone Duo', widths: [1100, 2853], size: [2853, 2007] }
  };
  let device = narrow.matches ? 'iphone' : 'duo';
  let chosenDevice = false;
  let index = 0;
  const poster = document.querySelector('[data-vault-poster]');
  const dialog = document.querySelector('[data-vault-dialog]');
  const full = document.querySelector('[data-vault-full]');
  const topics = document.querySelector('[data-vault-topics]');
  const topicButtons = names.map((_, position) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.addEventListener('click', () => { index = position; render(); });
    topics.append(button);
    return button;
  });
  const asset = (lang, target, name, width) => `./assets/vault-campaign/${lang}/${target}/${name}-${width}.webp?v=20261027`;
  const render = () => {
    const lang = document.documentElement.lang;
    const text = copy[lang] || copy['zh-Hans'];
    const spec = devices[device];
    const widths = spec.widths;
    const alt = `${lang.startsWith('zh') ? '定格' : 'Freezon'} / ${spec.name} / ${text.titles[index]}`;
    gallery.dataset.device = device;
    document.querySelectorAll('[data-vault-device]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.vaultDevice === device)));
    document.querySelector('.vault-device-switch').setAttribute('aria-label', text.device);
    topics.setAttribute('aria-label', text.topics);
    document.querySelectorAll('[data-vault-count], [data-vault-dialog-count]').forEach(counter => { counter.textContent = `${index + 1} / 6`; });
    poster.width = spec.size[0];
    poster.height = spec.size[1];
    poster.sizes = device === 'iphone' ? '(max-width: 600px) 280px, 340px' : '(max-width: 600px) calc(100vw - 36px), (max-width: 1188px) calc(100vw - 48px), 1140px';
    poster.srcset = widths.map(width => `${asset(lang, device, names[index], width)} ${width}w`).join(', ');
    poster.src = asset(lang, device, names[index], widths[0]);
    poster.alt = alt;
    document.querySelector('[data-vault-caption]').textContent = text.titles[index];
    document.querySelector('[data-vault-description]').textContent = text.descriptions[index];
    topicButtons.forEach((button, position) => {
      button.textContent = text.labels[position];
      button.setAttribute('aria-pressed', String(position === index));
    });
    document.querySelectorAll('[data-vault-prev]').forEach(button => { button.setAttribute('aria-label', text.previous); button.title = text.previous; });
    document.querySelectorAll('[data-vault-next]').forEach(button => { button.setAttribute('aria-label', text.next); button.title = text.next; });
    const opener = document.querySelector('[data-vault-open]');
    opener.setAttribute('aria-label', `${text.open}: ${text.titles[index]}`);
    opener.title = text.open;
    const closer = document.querySelector('[data-vault-close]');
    closer.setAttribute('aria-label', text.close);
    closer.title = text.close;
    dialog.setAttribute('aria-label', text.preview);
    document.querySelector('[data-vault-lightbox-title]').textContent = alt;
    if (dialog.open) { full.src = asset(lang, device, names[index], widths[1]); full.alt = alt; }
    const hero = document.querySelector('[data-vault-hero]');
    hero.querySelector('source').srcset = [660, 1320].map(width => `${asset(lang, 'iphone', names[0], width)} ${width}w`).join(', ');
    const heroImage = hero.querySelector('img');
    heroImage.srcset = devices.duo.widths.map(width => `${asset(lang, 'duo', names[0], width)} ${width}w`).join(', ');
    heroImage.src = asset(lang, 'duo', names[0], 1100);
    heroImage.alt = `${lang.startsWith('zh') ? '定格' : 'Freezon'} / ${narrow.matches ? 'iPhone' : 'iPhone Duo'} / ${text.titles[0]}`;
    const shareImage = `https://freezonapp.com/assets/vault-campaign/${lang}/duo/01_dual_vault-1100.webp?v=20261027`;
    document.querySelector('meta[property="og:image"]').content = shareImage;
    document.querySelector('meta[property="og:image:alt"]').content = `${lang.startsWith('zh') ? '定格' : 'Freezon'} / iPhone Duo / ${text.titles[0]}`;
    document.querySelector('meta[name="twitter:image"]').content = shareImage;
    const countries = { 'zh-Hans': 'cn', 'zh-Hant': 'tw', en: 'us', ja: 'jp', ko: 'kr', 'es-419': 'mx', 'pt-BR': 'br' };
    document.querySelector('[data-vault-download]').href = `https://apps.apple.com/${countries[lang]}/app/id6810494416`;
  };
  const move = step => { index = (index + step + names.length) % names.length; render(); };
  document.querySelectorAll('[data-vault-device]').forEach(button => button.addEventListener('click', () => { device = button.dataset.vaultDevice; chosenDevice = true; render(); }));
  document.querySelectorAll('[data-vault-prev]').forEach(button => button.addEventListener('click', () => move(-1)));
  document.querySelectorAll('[data-vault-next]').forEach(button => button.addEventListener('click', () => move(1)));
  document.querySelector('[data-vault-open]').addEventListener('click', () => { dialog.showModal(); render(); });
  document.querySelector('[data-vault-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    full.removeAttribute('src');
    document.querySelector('[data-vault-open]').focus({ preventScroll: true });
  });
  const keyboard = event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); }
  };
  gallery.addEventListener('keydown', keyboard);
  dialog.addEventListener('keydown', keyboard);
  document.addEventListener('freezon:languagechange', render);
  narrow.addEventListener('change', () => { if (!chosenDevice) device = narrow.matches ? 'iphone' : 'duo'; render(); });
  render();
})();
