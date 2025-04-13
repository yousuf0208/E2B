import requests
import streamlit as st
from googletrans import Translator

translator = Translator()

def get_synonyms(word):
    url = f"https://api.datamuse.com/words?rel_syn={word}"
    response = requests.get(url)
    data = response.json()
    return [item['word'] for item in data]

def translate_bangla(word):
    try:
        result = translator.translate(word, src='en', dest='bn')
        return result.text
    except:
        return "অনুবাদ পাওয়া যায়নি"

st.title("English Synonym + Bangla Meaning")
word = st.text_input("Enter an English Word")

if word:
    synonyms = get_synonyms(word)
    st.subheader("Synonyms and Bangla Translation:")
    for syn in synonyms[:5]:
        bangla = translate_bangla(syn)
        st.write(f"**{syn}** → {bangla}")
