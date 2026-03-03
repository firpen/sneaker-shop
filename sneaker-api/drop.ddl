
    set client_min_messages = WARNING;

    alter table if exists CART 
       drop constraint if exists FKbtkmo7gvtb6iofl4k1p3ochh2;

    alter table if exists CART_ITEM 
       drop constraint if exists FK2l1iquervs4rnu2tftphkvn;

    alter table if exists CART_ITEM 
       drop constraint if exists FKio3hod6i1culfqtijabqesjpf;

    alter table if exists INVENTORY 
       drop constraint if exists FKchydawwgjaxn6fbcfh55apoya;

    alter table if exists OrderItem 
       drop constraint if exists FKb67j1nk0dlu7pm3ikx5ufl14h;

    alter table if exists OrderItem 
       drop constraint if exists FK1tc9ikxf3lkoyi4k0gn9unvel;

    alter table if exists t_ORDER 
       drop constraint if exists FKdthpks2nqt57ko628foiiuch0;

    alter table if exists t_product 
       drop constraint if exists FKq4pg91sy597f8eopxb9hh1m2o;

    alter table if exists t_product_variant 
       drop constraint if exists FKmrc0p3ydb0c9l7jn4isnr350i;

    drop table if exists CART cascade;

    drop table if exists CART_ITEM cascade;

    drop table if exists INVENTORY cascade;

    drop table if exists OrderItem cascade;

    drop table if exists t_category cascade;

    drop table if exists t_ORDER cascade;

    drop table if exists t_product cascade;

    drop table if exists t_product_variant cascade;

    drop table if exists users cascade;
