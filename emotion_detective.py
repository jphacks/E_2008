# 2020/10/31 TANAKA
# emotion detective from images
# https://www.pc-koubou.jp/magazine/27499

import cognitive_face as CF

KEY = '4490cc6285cd476881961a49cf6b2579'
BASE_URL = 'https://japaneast.api.cognitive.microsoft.com/face/v1.0'

CF.Key.set(KEY)
CF.BaseUrl.set(BASE_URL)

img_url = "test1.jpg"
faces = CF.face.detect(img_url, attributes='emotion')

print(faces)