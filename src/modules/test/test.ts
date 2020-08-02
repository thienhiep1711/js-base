import { formData } from './forms'

export default () => {
  const form = document.querySelector('form')!
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = formData(form);
      console.log(data)
  })
}
