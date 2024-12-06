// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Samuel/Documents/A_Programacion/Proyectos/Paginas%20web/film-peek/node_modules/vite/dist/node/index.js";
import svgLoader from "file:///C:/Users/Samuel/Documents/A_Programacion/Proyectos/Paginas%20web/film-peek/node_modules/vite-svg-loader/index.js";
import vue from "file:///C:/Users/Samuel/Documents/A_Programacion/Proyectos/Paginas%20web/film-peek/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Samuel/Documents/A_Programacion/Proyectos/Paginas%20web/film-peek/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["lite-youtube", "swiper-slide", "swiper-container"].includes(tag)
        }
      }
    }),
    svgLoader()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTYW11ZWxcXFxcRG9jdW1lbnRzXFxcXEFfUHJvZ3JhbWFjaW9uXFxcXFByb3llY3Rvc1xcXFxQYWdpbmFzIHdlYlxcXFxmaWxtLXBlZWtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFNhbXVlbFxcXFxEb2N1bWVudHNcXFxcQV9Qcm9ncmFtYWNpb25cXFxcUHJveWVjdG9zXFxcXFBhZ2luYXMgd2ViXFxcXGZpbG0tcGVla1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvU2FtdWVsL0RvY3VtZW50cy9BX1Byb2dyYW1hY2lvbi9Qcm95ZWN0b3MvUGFnaW5hcyUyMHdlYi9maWxtLXBlZWsvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKHtcclxuICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcclxuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogKHRhZykgPT4gWydsaXRlLXlvdXR1YmUnLCAnc3dpcGVyLXNsaWRlJywgJ3N3aXBlci1jb250YWluZXInXS5pbmNsdWRlcyh0YWcpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIHN2Z0xvYWRlcigpXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0WixTQUFTLGVBQWUsV0FBVztBQUUvYixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxTQUFTO0FBSnVQLElBQU0sMkNBQTJDO0FBT3hULElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFVBQ2YsaUJBQWlCLENBQUMsUUFBUSxDQUFDLGdCQUFnQixnQkFBZ0Isa0JBQWtCLEVBQUUsU0FBUyxHQUFHO0FBQUEsUUFDN0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=